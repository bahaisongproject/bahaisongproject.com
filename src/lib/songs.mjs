const DEFAULT_CONVEX_SITE_URL =
  "https://pastel-canary-414.eu-west-1.convex.site"

const endpointCache = {
  listSongsPromise: null,
  detailSongPromisesBySlug: new Map(),
}

function getBaseUrl() {
  return (process.env.CONVEX_SITE_URL || DEFAULT_CONVEX_SITE_URL).replace(
    /\/+$/,
    ""
  )
}

async function requestJson(endpointPath) {
  const url = new URL(endpointPath, `${getBaseUrl()}/`).toString()
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(
      `Request failed (${response.status}) for ${url}: ${body.slice(0, 300)}`
    )
  }

  return response.json()
}

function normalizeSong(song) {
  const safeSong = song || {}
  return {
    ...safeSong,
    contributors: Array.isArray(safeSong.contributors)
      ? safeSong.contributors
      : [],
    excerpts: Array.isArray(safeSong.excerpts) ? safeSong.excerpts : [],
    languages: Array.isArray(safeSong.languages) ? safeSong.languages : [],
    renditions: Array.isArray(safeSong.renditions) ? safeSong.renditions : [],
    tags: Array.isArray(safeSong.tags) ? safeSong.tags : [],
  }
}

function normalizeSongsResponse(response, endpointPath) {
  if (!response || !Array.isArray(response.songs)) {
    throw new Error(`Expected { songs: [...] } response from ${endpointPath}`)
  }
  return response.songs.map((song) => normalizeSong(song))
}

function normalizeSongResponse(response, endpointPath) {
  if (
    !response ||
    typeof response.song !== "object" ||
    response.song === null
  ) {
    throw new Error(`Expected { song: {...} } response from ${endpointPath}`)
  }
  return normalizeSong(response.song)
}

async function getSongsFromPath(endpointPath) {
  const response = await requestJson(endpointPath)
  return normalizeSongsResponse(response, endpointPath)
}

async function getSongFromPath(endpointPath) {
  const response = await requestJson(endpointPath)
  return normalizeSongResponse(response, endpointPath)
}

export function getSongsForListViews() {
  if (!endpointCache.listSongsPromise) {
    endpointCache.listSongsPromise = getSongsFromPath("/api/v0/songs")
  }
  return endpointCache.listSongsPromise
}

export function getSongDetail(slug) {
  if (!slug) {
    throw new Error("Song slug is required")
  }

  if (endpointCache.detailSongPromisesBySlug.has(slug)) {
    return endpointCache.detailSongPromisesBySlug.get(slug)
  }

  const detailPromise = getSongFromPath(
    `/api/v0/songs/${encodeURIComponent(slug)}`
  )
  endpointCache.detailSongPromisesBySlug.set(slug, detailPromise)
  return detailPromise
}

export async function getSongDetailsForStaticPaths() {
  const listSongs = await getSongsForListViews()
  return Promise.all(
    listSongs.map(async (listSong) => {
      try {
        return await getSongDetail(listSong.slug)
      } catch (error) {
        console.warn(
          `Using list payload for "${listSong.slug}" because detail fetch failed: ${error.message}`
        )
        return listSong
      }
    })
  )
}
