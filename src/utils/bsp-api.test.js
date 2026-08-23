/* eslint-env es6 */
const { beforeEach, describe, expect, test } = require("bun:test")
const http = require("http")
const {
  fetchWebsiteSongs,
  getWebsiteSongs,
  projectCatalogResponse,
  requestCatalog,
  resetCatalogCacheForTests,
} = require("./bsp-api")

function catalogSong(overrides = {}) {
  return {
    id: "song-1",
    title: "A Song",
    creditText: "Traditional",
    authority: {
      kind: "catalog",
      slug: "a-song",
      publishedAt: "2026-08-20T10:00:00.000Z",
    },
    languages: [{ name: "English" }],
    tags: [{ name: "Prayer" }],
    contributors: [{ name: "Ada", roles: ["composer"] }],
    artifacts: [
      { relation: "leadSheet", text: "ignored" },
      { relation: "rendition", url: "https://youtu.be/dQw4w9WgXcQ" },
      { relation: "rendition", url: "https://soundcloud.com/artist/song" },
      { relation: "rendition", url: "https://media.example/song.mp3" },
      { relation: "rendition", url: "https://artist.bandcamp.com/track/song" },
    ],
    relatedVersions: [],
    ...overrides,
  }
}

describe("REST v2 Catalog adapter", () => {
  beforeEach(resetCatalogCacheForTests)

  test("projects one trusted Website Song and preserves supported rendition order", () => {
    expect(
      projectCatalogResponse({ songs: [catalogSong()], futureField: true })
    ).toEqual([
      {
        songId: "song-1",
        slug: "a-song",
        title: "A Song",
        publishedAt: "2026-08-20T10:00:00.000Z",
        creditText: "Traditional",
        contributorNames: ["Ada"],
        languageNames: ["English"],
        tagNames: ["Prayer"],
        creditLine: "Ada",
        renditions: [
          {
            provider: "youtube",
            contentUrl: "https://youtu.be/dQw4w9WgXcQ",
            videoId: "dQw4w9WgXcQ",
          },
          {
            provider: "soundcloud",
            contentUrl: "https://soundcloud.com/artist/song",
          },
          {
            provider: "bandcamp",
            contentUrl: "https://artist.bandcamp.com/track/song",
          },
        ],
      },
    ])
  })

  test("uses credit text only when the Song has no contributors", () => {
    const [song] = projectCatalogResponse({
      songs: [catalogSong({ contributors: [], creditText: "Anonymous" })],
    })
    expect(song.creditLine).toBe("Anonymous")
  })

  test("consumes contributor names without depending on roles", () => {
    const [song] = projectCatalogResponse({
      songs: [
        catalogSong({
          contributors: [
            { name: "Ada" },
            { name: "Grace", roles: ["future-role"], futureField: true },
          ],
        }),
      ],
    })
    expect(song.contributorNames).toEqual(["Ada", "Grace"])
  })

  test("ignores known non-rendition artifacts and additive artifact fields", () => {
    const [song] = projectCatalogResponse({
      songs: [
        catalogSong({
          artifacts: [
            { relation: "lyrics", text: "Words", futureField: true },
            {
              relation: "rendition",
              url: "https://soundcloud.com/artist/song",
              futureField: true,
            },
          ],
        }),
      ],
    })
    expect(song.renditions).toEqual([
      {
        provider: "soundcloud",
        contentUrl: "https://soundcloud.com/artist/song",
      },
    ])
  })

  test("ignores a valid rendition URL from an unsupported provider", () => {
    const [song] = projectCatalogResponse({
      songs: [
        catalogSong({
          artifacts: [
            { relation: "rendition", url: "https://media.example/song.mp3" },
          ],
        }),
      ],
    })
    expect(song.renditions).toEqual([])
  })

  test.each([
    [{ songs: [] }, "must not be empty"],
    [{ songs: [catalogSong()], nextCursor: "more" }, "must not be paginated"],
    [
      { songs: [catalogSong({ authority: { kind: "owned" } })] },
      "must be Catalog authority",
    ],
    [{ songs: [catalogSong(), catalogSong()] }, "Duplicate Song ID"],
    [
      {
        songs: [
          catalogSong(),
          catalogSong({
            id: "song-2",
            authority: {
              kind: "catalog",
              slug: "a-song",
              publishedAt: "2026-08-20T10:00:00.000Z",
            },
          }),
        ],
      },
      "Duplicate Catalog slug",
    ],
    [
      { songs: [catalogSong({ artifacts: [{ relation: "futureRelation" }] })] },
      "relation is unknown",
    ],
    [
      {
        songs: [
          catalogSong({
            artifacts: [
              {
                relation: "rendition",
                url: "https://youtube.com/watch?v=short",
              },
            ],
          }),
        ],
      },
      "valid YouTube video ID",
    ],
    [
      {
        songs: [
          catalogSong({
            artifacts: [{ relation: "rendition", url: "not-a-url" }],
          }),
        ],
      },
      "absolute HTTP(S) URL",
    ],
  ])("rejects a broken Catalog contract", (payload, message) => {
    expect(() => projectCatalogResponse(payload)).toThrow(message)
  })

  test("retries transient failures with bounded backoff", async () => {
    const waits = []
    let attempts = 0
    const songs = await fetchWebsiteSongs({
      request: async () => {
        attempts += 1
        if (attempts < 3) {
          const error = new Error("temporary")
          error.retryable = true
          error.retryAfterMs = attempts === 1 ? 25 : null
          throw error
        }
        return ["ready"]
      },
      wait: async (milliseconds) => waits.push(milliseconds),
    })
    expect(songs).toEqual(["ready"])
    expect(waits).toEqual([25, 2000])
  })

  test("does not retry a semantic contract failure", async () => {
    let attempts = 0
    await expect(
      fetchWebsiteSongs({
        request: async () => {
          attempts += 1
          throw new Error("bad contract")
        },
        wait: async () => {
          throw new Error("must not wait")
        },
      })
    ).rejects.toThrow("bad contract")
    expect(attempts).toBe(1)
  })

  test("stops after exactly three retryable failures", async () => {
    let attempts = 0
    const waits = []
    await expect(
      fetchWebsiteSongs({
        request: async () => {
          attempts += 1
          const error = new Error("still unavailable")
          error.retryable = true
          throw error
        },
        wait: async (milliseconds) => waits.push(milliseconds),
      })
    ).rejects.toThrow("still unavailable")
    expect(attempts).toBe(3)
    expect(waits).toEqual([1000, 2000])
  })

  test.each([
    [400, false],
    [404, false],
    [408, true],
    [429, true],
    [500, true],
    [503, true],
  ])("classifies HTTP %i retryability", async (status, retryable) => {
    // eslint-disable-next-line no-undef
    const server = Bun.serve({
      port: 0,
      fetch: () => new Response("no", { status }),
    })
    try {
      await requestCatalog(
        `http://127.0.0.1:${server.port}/v2/catalog/songs`
      ).catch((error) => expect(error.retryable).toBe(retryable))
    } finally {
      server.stop(true)
    }
  })

  test("caps Retry-After at 30 seconds", async () => {
    // eslint-disable-next-line no-undef
    const server = Bun.serve({
      port: 0,
      fetch: () =>
        new Response("later", {
          status: 429,
          headers: { "Retry-After": "3600" },
        }),
    })
    try {
      await requestCatalog(
        `http://127.0.0.1:${server.port}/v2/catalog/songs`
      ).catch((error) => expect(error.retryAfterMs).toBe(30000))
    } finally {
      server.stop(true)
    }
  })

  test("times out without waiting for the production timeout", async () => {
    const server = http.createServer((_request, response) => {
      response.writeHead(200, { "Content-Type": "application/json" })
      response.flushHeaders()
    })
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
    const { port } = server.address()
    try {
      await expect(
        requestCatalog(`http://127.0.0.1:${port}/v2/catalog/songs`, {
          timeoutMs: 20,
        })
      ).rejects.toThrow("timed out after 20ms")
    } finally {
      server.closeAllConnections()
      await new Promise((resolve) => server.close(resolve))
    }
  })

  test("rejects a decoded response larger than 10 MiB", async () => {
    // eslint-disable-next-line no-undef
    const server = Bun.serve({
      port: 0,
      fetch: () => new Response("x".repeat(10 * 1024 * 1024 + 1)),
    })
    try {
      await expect(
        requestCatalog(`http://127.0.0.1:${server.port}/v2/catalog/songs`)
      ).rejects.toThrow("exceeds 10 MiB")
    } finally {
      server.stop(true)
    }
  })

  test("shares one Catalog request across every consumer", async () => {
    const original = process.env.CONVEX_SITE_URL
    process.env.CONVEX_SITE_URL = "http://127.0.0.1:1"
    const first = getWebsiteSongs()
    expect(getWebsiteSongs()).toBe(first)
    await first.catch(() => {})
    if (original === undefined) delete process.env.CONVEX_SITE_URL
    else process.env.CONVEX_SITE_URL = original
  })
})
