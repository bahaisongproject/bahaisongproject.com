/* eslint-env es6 */
const http = require("http")
const https = require("https")
const { URL } = require("url")

const DEFAULT_CONVEX_SITE_URL =
  "https://pastel-canary-414.eu-west-1.convex.site"

const endpointCache = {
  listSongsPromise: null,
  algoliaSongsPromise: null,
  detailSongPromisesBySlug: {},
}

function getBaseUrl() {
  return (process.env.CONVEX_SITE_URL || DEFAULT_CONVEX_SITE_URL).replace(
    /\/+$/,
    ""
  )
}

function requestJson(url) {
  return new Promise(function requestPromise(resolve, reject) {
    const parsedUrl = new URL(url)
    const client = parsedUrl.protocol === "https:" ? https : http

    const req = client.get(
      parsedUrl,
      {
        headers: {
          Accept: "application/json",
        },
      },
      function onResponse(res) {
        const statusCode = res.statusCode || 0
        const headers = res.headers || {}
        let body = ""

        res.setEncoding("utf8")
        res.on("data", function onData(chunk) {
          body += chunk
        })

        res.on("end", function onEnd() {
          if (
            statusCode >= 300 &&
            statusCode < 400 &&
            typeof headers.location === "string"
          ) {
            const redirectedUrl = new URL(
              headers.location,
              parsedUrl
            ).toString()
            resolve(requestJson(redirectedUrl))
            return
          }

          if (statusCode < 200 || statusCode >= 300) {
            reject(
              new Error(
                `Request failed (${statusCode}) for ${url}: ${body.slice(
                  0,
                  300
                )}`
              )
            )
            return
          }

          try {
            resolve(JSON.parse(body))
          } catch (error) {
            reject(new Error(`Invalid JSON from ${url}: ${error.message}`))
          }
        })
      }
    )

    req.on("error", function onError(error) {
      reject(new Error(`Request error for ${url}: ${error.message}`))
    })
  })
}

function normalizeSong(song) {
  const safeSong = song || {}
  const normalizedSong = Object.assign({}, safeSong)

  normalizedSong.contributors = Array.isArray(safeSong.contributors)
    ? safeSong.contributors
    : []
  normalizedSong.excerpts = Array.isArray(safeSong.excerpts)
    ? safeSong.excerpts
    : []
  normalizedSong.languages = Array.isArray(safeSong.languages)
    ? safeSong.languages
    : []
  normalizedSong.renditions = Array.isArray(safeSong.renditions)
    ? safeSong.renditions
    : []
  normalizedSong.tags = Array.isArray(safeSong.tags) ? safeSong.tags : []

  return normalizedSong
}

function normalizeSongsResponse(response, endpointPath) {
  if (!response || !Array.isArray(response.songs)) {
    throw new Error(`Expected { songs: [...] } response from ${endpointPath}`)
  }
  return response.songs.map(function mapSong(song) {
    return normalizeSong(song)
  })
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
  const url = new URL(endpointPath, `${getBaseUrl()}/`).toString()
  const response = await requestJson(url)
  return normalizeSongsResponse(response, endpointPath)
}

async function getSongFromPath(endpointPath) {
  const url = new URL(endpointPath, `${getBaseUrl()}/`).toString()
  const response = await requestJson(url)
  return normalizeSongResponse(response, endpointPath)
}

function getSongsForListViews() {
  if (!endpointCache.listSongsPromise) {
    endpointCache.listSongsPromise = getSongsFromPath("/api/v0/songs")
  }
  return endpointCache.listSongsPromise
}

function getSongsForAlgolia() {
  if (!endpointCache.algoliaSongsPromise) {
    endpointCache.algoliaSongsPromise = getSongsFromPath(
      "/api/v0/songs?for=algolia"
    )
  }
  return endpointCache.algoliaSongsPromise
}

function getSongDetail(slug) {
  if (!slug) {
    throw new Error("Song slug is required")
  }

  const cachedPromise = endpointCache.detailSongPromisesBySlug[slug]
  if (cachedPromise) {
    return cachedPromise
  }

  const detailPromise = getSongFromPath(
    `/api/v0/songs/${encodeURIComponent(slug)}`
  )
  endpointCache.detailSongPromisesBySlug[slug] = detailPromise
  return detailPromise
}

module.exports = {
  getSongsForListViews,
  getSongsForAlgolia,
  getSongDetail,
}
