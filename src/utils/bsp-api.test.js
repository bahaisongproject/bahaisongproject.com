const { beforeEach, describe, expect, test } = require("bun:test")
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

  test.each([
    [{ songs: [] }, "must not be empty"],
    [{ songs: [catalogSong()], nextCursor: "more" }, "must not be paginated"],
    [
      { songs: [catalogSong({ authority: { kind: "owned" } })] },
      "must be Catalog authority",
    ],
    [{ songs: [catalogSong(), catalogSong()] }, "Duplicate Song ID"],
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
