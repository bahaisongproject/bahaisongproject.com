/* eslint-env es6 */
const http = require("http")
const https = require("https")
const { URL } = require("url")
const { get_youtube_id } = require("./embed")

const DEFAULT_CONVEX_SITE_URL =
  "https://pastel-canary-414.eu-west-1.convex.site"
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024
const KNOWN_RELATIONS = new Set([
  "leadSheet",
  "notation",
  "lyrics",
  "rendition",
  "accompaniment",
  "tutorial",
])
let catalogPromise = null

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function requiredString(value, location) {
  if (typeof value !== "string" || value.trim() === "")
    throw new Error(`${location} must be a nonempty string`)
  return value
}

function namedValues(value, location) {
  if (!Array.isArray(value)) throw new Error(`${location} must be an array`)
  return value.map((item, index) => {
    if (!isObject(item))
      throw new Error(`${location}[${index}] must be an object`)
    return requiredString(item.name, `${location}[${index}].name`)
  })
}

function contributorNames(value, location) {
  if (!Array.isArray(value)) throw new Error(`${location} must be an array`)
  return value.map((item, index) => {
    if (!isObject(item))
      throw new Error(`${location}[${index}] must be an object`)
    return requiredString(item.name, `${location}[${index}].name`)
  })
}

function renditionFromArtifact(artifact, location) {
  const contentUrl = requiredString(artifact.url, `${location}.url`)
  let parsed
  try {
    parsed = new URL(contentUrl)
  } catch (error) {
    throw new Error(`${location}.url must be an absolute HTTP(S) URL`)
  }
  if (!/^https?:$/.test(parsed.protocol))
    throw new Error(`${location}.url must be an absolute HTTP(S) URL`)
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "")
  if (
    host === "youtu.be" ||
    host === "youtube.com" ||
    host.endsWith(".youtube.com") ||
    host === "youtube-nocookie.com" ||
    host.endsWith(".youtube-nocookie.com")
  ) {
    const videoId = get_youtube_id(contentUrl)
    if (!videoId)
      throw new Error(`${location}.url has no valid YouTube video ID`)
    return { provider: "youtube", contentUrl, videoId }
  }
  if (host === "soundcloud.com" || host.endsWith(".soundcloud.com"))
    return { provider: "soundcloud", contentUrl }
  if (host === "bandcamp.com" || host.endsWith(".bandcamp.com"))
    return { provider: "bandcamp", contentUrl }
  return null
}

function projectSong(song, index) {
  const location = `songs[${index}]`
  if (!isObject(song)) throw new Error(`${location} must be an object`)
  if (!isObject(song.authority) || song.authority.kind !== "catalog")
    throw new Error(`${location}.authority must be Catalog authority`)
  if (!Array.isArray(song.artifacts))
    throw new Error(`${location}.artifacts must be an array`)
  const names = contributorNames(song.contributors, `${location}.contributors`)
  const creditText =
    song.creditText === undefined || song.creditText === null
      ? null
      : requiredString(song.creditText, `${location}.creditText`)
  const renditions = []
  song.artifacts.forEach((artifact, artifactIndex) => {
    const artifactLocation = `${location}.artifacts[${artifactIndex}]`
    if (!isObject(artifact))
      throw new Error(`${artifactLocation} must be an object`)
    const relation = requiredString(
      artifact.relation,
      `${artifactLocation}.relation`
    )
    if (!KNOWN_RELATIONS.has(relation))
      throw new Error(`${artifactLocation}.relation is unknown: ${relation}`)
    if (relation === "rendition") {
      const rendition = renditionFromArtifact(artifact, artifactLocation)
      if (rendition) renditions.push(rendition)
    }
  })
  return {
    songId: requiredString(song.id, `${location}.id`),
    slug: requiredString(song.authority.slug, `${location}.authority.slug`),
    title: requiredString(song.title, `${location}.title`),
    publishedAt: requiredString(
      song.authority.publishedAt,
      `${location}.authority.publishedAt`
    ),
    creditText,
    contributorNames: names,
    languageNames: namedValues(song.languages, `${location}.languages`),
    tagNames: namedValues(song.tags, `${location}.tags`),
    creditLine: names.length ? names.join(", ") : creditText,
    renditions,
  }
}

function projectCatalogResponse(response) {
  if (!isObject(response) || !Array.isArray(response.songs))
    throw new Error("Expected { songs: [...] } from /v2/catalog/songs")
  if (!response.songs.length) throw new Error("Catalog must not be empty")
  if (
    ["nextCursor", "cursor", "page"].some((key) =>
      Object.prototype.hasOwnProperty.call(response, key)
    )
  )
    throw new Error("Catalog response must not be paginated")
  const songs = response.songs.map(projectSong)
  const ids = new Set()
  const slugs = new Set()
  songs.forEach((song) => {
    if (ids.has(song.songId))
      throw new Error(`Duplicate Song ID: ${song.songId}`)
    if (slugs.has(song.slug))
      throw new Error(`Duplicate Catalog slug: ${song.slug}`)
    ids.add(song.songId)
    slugs.add(song.slug)
  })
  return songs
}

function retryAfterMs(value) {
  if (typeof value !== "string" || !value.trim()) return null
  const seconds = Number(value)
  if (Number.isFinite(seconds) && seconds >= 0)
    return Math.min(seconds * 1000, 30000)
  const dateMs = Date.parse(value)
  return Number.isFinite(dateMs)
    ? Math.min(Math.max(dateMs - Date.now(), 0), 30000)
    : null
}

function requestCatalog(url, options = {}) {
  const timeoutMs = options.timeoutMs || 30000
  return new Promise((resolve, reject) => {
    let timeout
    const resolveRequest = (value) => {
      clearTimeout(timeout)
      resolve(value)
    }
    const rejectRequest = (error) => {
      clearTimeout(timeout)
      reject(error)
    }
    const parsed = new URL(url)
    const request = (parsed.protocol === "https:" ? https : http).get(
      parsed,
      { headers: { Accept: "application/json" } },
      (response) => {
        const chunks = []
        let bytes = 0
        response.on("data", (chunk) => {
          bytes += chunk.length
          if (bytes > MAX_RESPONSE_BYTES) {
            const error = new Error("Catalog response exceeds 10 MiB")
            error.retryable = false
            response.destroy(error)
            request.destroy(error)
            rejectRequest(error)
            return
          }
          chunks.push(chunk)
        })
        response.on("end", () => {
          const status = response.statusCode || 0
          if (status < 200 || status >= 300) {
            const error = new Error(
              `Catalog request failed with HTTP ${status}`
            )
            error.retryable = status === 408 || status === 429 || status >= 500
            error.retryAfterMs = retryAfterMs(response.headers["retry-after"])
            rejectRequest(error)
            return
          }
          try {
            resolveRequest(
              projectCatalogResponse(
                JSON.parse(Buffer.concat(chunks).toString("utf8"))
              )
            )
          } catch (error) {
            rejectRequest(error)
          }
        })
      }
    )
    timeout = setTimeout(() => {
      const error = new Error(`Catalog request timed out after ${timeoutMs}ms`)
      error.retryable = true
      rejectRequest(error)
      request.destroy(error)
    }, timeoutMs)
    request.on("error", (error) => {
      if (
        error.retryable === undefined &&
        !error.message.includes("exceeds 10 MiB")
      )
        error.retryable = true
      rejectRequest(error)
    })
  })
}

async function fetchWebsiteSongs(options = {}) {
  const request = options.request || requestCatalog
  const wait =
    options.wait ||
    ((milliseconds) =>
      new Promise((resolve) => setTimeout(resolve, milliseconds)))
  const baseUrl = (
    process.env.CONVEX_SITE_URL || DEFAULT_CONVEX_SITE_URL
  ).replace(/\/+$/, "")
  const url =
    options.url || new URL("/v2/catalog/songs", `${baseUrl}/`).toString()
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await request(url)
    } catch (error) {
      if (!error.retryable || attempt === 3) throw error
      await wait(
        error.retryAfterMs == null ? attempt * 1000 : error.retryAfterMs
      )
    }
  }
}

function getWebsiteSongs() {
  if (!catalogPromise) catalogPromise = fetchWebsiteSongs()
  return catalogPromise
}

function resetCatalogCacheForTests() {
  catalogPromise = null
}

module.exports = {
  fetchWebsiteSongs,
  getWebsiteSongs,
  projectCatalogResponse,
  requestCatalog,
  resetCatalogCacheForTests,
}
