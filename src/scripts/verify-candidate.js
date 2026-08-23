/* eslint-env es6 */
const fs = require("fs")
const path = require("path")
const { getWebsiteSongs } = require("../utils/bsp-api")

const publicDirectory = path.resolve(process.cwd(), "public")

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

async function verifyCandidate() {
  const songs = await getWebsiteSongs()
  const expectedSongSlugs = new Set(songs.map((song) => song.slug))
  const missingRoutes = []
  const wrongIdentities = []

  songs.forEach((song) => {
    const htmlPath = path.join(publicDirectory, song.slug, "index.html")
    const pageDataPath = path.join(
      publicDirectory,
      "page-data",
      song.slug,
      "page-data.json"
    )
    if (!fs.existsSync(htmlPath) || !fs.existsSync(pageDataPath)) {
      missingRoutes.push(song.slug)
      return
    }
    const pageData = readJson(pageDataPath)
    const builtSongId =
      pageData.result && pageData.result.data && pageData.result.data.song
        ? pageData.result.data.song.songId
        : null
    if (builtSongId !== song.songId) wrongIdentities.push(song.slug)
  })

  const requiredStaticRoutes = [
    "index.html",
    "all-songs/index.html",
    "collections/index.html",
    "about/index.html",
    "404.html",
  ]
  const missingStaticRoutes = requiredStaticRoutes.filter(
    (route) => !fs.existsSync(path.join(publicDirectory, route))
  )
  const builtSongSlugs = fs
    .readdirSync(path.join(publicDirectory, "page-data"), {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => {
      const pageDataPath = path.join(
        publicDirectory,
        "page-data",
        entry.name,
        "page-data.json"
      )
      if (!fs.existsSync(pageDataPath)) return false
      return readJson(pageDataPath).componentChunkName.includes(
        "templates-song-template"
      )
    })
    .map((entry) => entry.name)
  const staleRoutes = builtSongSlugs.filter(
    (slug) => !expectedSongSlugs.has(slug)
  )
  const v0Bundles = fs
    .readdirSync(publicDirectory)
    .filter((fileName) => fileName.endsWith(".js"))
    .filter((fileName) =>
      fs
        .readFileSync(path.join(publicDirectory, fileName), "utf8")
        .includes("/api/v0")
    )
  if (
    missingRoutes.length ||
    wrongIdentities.length ||
    missingStaticRoutes.length ||
    staleRoutes.length ||
    v0Bundles.length
  ) {
    throw new Error(
      JSON.stringify({
        missingRoutes,
        wrongIdentities,
        missingStaticRoutes,
        staleRoutes,
        v0Bundles,
      })
    )
  }

  const report = {
    catalogEndpoint: "/v2/catalog/songs",
    songCount: songs.length,
    songRouteCount: builtSongSlugs.length,
    uniqueSongIds: new Set(songs.map((song) => song.songId)).size,
    uniqueSlugs: new Set(songs.map((song) => song.slug)).size,
    supportedRenditions: songs.reduce(
      (count, song) => count + song.renditions.length,
      0
    ),
    staticRoutes: requiredStaticRoutes,
    verifiedAt: new Date().toISOString(),
  }
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`)
}

verifyCandidate().catch((error) => {
  process.stderr.write(`Candidate verification failed: ${error.message}\n`)
  process.exitCode = 1
})
