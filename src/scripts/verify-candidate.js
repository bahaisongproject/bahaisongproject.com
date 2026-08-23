/* eslint-env es6 */
const fs = require("fs")
const path = require("path")
const { getWebsiteSongs } = require("../utils/bsp-api")
const {
  ALGOLIA_RECORD_FIELDS,
  FEATURED_SONG_SLUGS,
} = require("../utils/site-contract")

const publicDirectory = path.resolve(process.cwd(), "public")
const collectionDirectory = path.resolve(process.cwd(), "src/collections")

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function filesBelow(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? filesBelow(entryPath) : [entryPath]
  })
}

function collectionSlugs() {
  return filesBelow(collectionDirectory)
    .filter((filePath) => /\.mdx?$/.test(filePath))
    .map((filePath) => {
      const match = fs
        .readFileSync(filePath, "utf8")
        .match(/^slug:\s*["']?([^"'\n]+)["']?\s*$/m)
      if (!match) throw new Error(`Collection has no slug: ${filePath}`)
      return match[1]
    })
}

function songPageData(slug) {
  return readJson(
    path.join(publicDirectory, "page-data", slug, "page-data.json")
  ).result.data.song
}

function requireText(text, expected, failures, label) {
  if (!text.includes(expected)) failures.push(`${label}: ${expected}`)
}

function verifyRedirects(failures) {
  const redirects = fs.readFileSync(
    path.join(publicDirectory, "_redirects"),
    "utf8"
  )
  ;[
    "/entzuendet /entzuende 301!",
    "/request-submit https://portal.bahaisongs.com/submissions 301!",
    "/songbook /songbook.pdf 301!",
    "/:slug.pdf  https://pdf.bahaisongproject.com/:slug.pdf  200",
    "/:slug.pro  https://pdf.bahaisongproject.com/:slug.pro  200",
  ].forEach((rule) =>
    requireText(redirects, rule, failures, "missing redirect")
  )
  ;["/api/v0", "bahaisongproject.com/language/"].forEach((removed) => {
    if (redirects.includes(removed))
      failures.push(`removed redirect: ${removed}`)
  })
}

function verifyCandidateBuild(songs) {
  const failures = []
  const expectedSongSlugs = new Set(songs.map((song) => song.slug))
  const requiredStaticRoutes = [
    "index.html",
    "all-songs/index.html",
    "collections/index.html",
    "about/index.html",
    "404.html",
  ]
  requiredStaticRoutes.forEach((route) => {
    if (!fs.existsSync(path.join(publicDirectory, route)))
      failures.push(`missing static route: ${route}`)
  })

  const home = fs.readFileSync(path.join(publicDirectory, "index.html"), "utf8")
  FEATURED_SONG_SLUGS.forEach((slug) => {
    if (!expectedSongSlugs.has(slug))
      failures.push(`missing featured Song: ${slug}`)
    requireText(home, `href="/${slug}"`, failures, "missing featured link")
  })
  collectionSlugs().forEach((slug) => {
    if (!fs.existsSync(path.join(publicDirectory, slug, "index.html")))
      failures.push(`missing collection route: ${slug}`)
  })

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
      return (
        fs.existsSync(pageDataPath) &&
        readJson(pageDataPath).componentChunkName.includes(
          "templates-song-template"
        )
      )
    })
    .map((entry) => entry.name)

  const algoliaRecords = []
  songs.forEach((song) => {
    const htmlPath = path.join(publicDirectory, song.slug, "index.html")
    if (!fs.existsSync(htmlPath)) {
      failures.push(`missing Song route: ${song.slug}`)
      return
    }
    const builtSong = songPageData(song.slug)
    if (builtSong.songId !== song.songId)
      failures.push(`wrong Song identity: ${song.slug}`)
    const renditionIdentity = (rendition) => [
      rendition.provider,
      rendition.contentUrl,
      rendition.videoId || null,
    ]
    if (
      JSON.stringify(builtSong.renditions.map(renditionIdentity)) !==
      JSON.stringify(song.renditions.map(renditionIdentity))
    )
      failures.push(`wrong rendition order: ${song.slug}`)

    const record = { objectID: builtSong.songId, ...builtSong }
    delete record.songId
    delete record.renditions
    if (
      JSON.stringify(Object.keys(record).sort()) !==
      JSON.stringify([...ALGOLIA_RECORD_FIELDS].sort())
    )
      failures.push(`wrong Algolia record shape: ${song.slug}`)
    algoliaRecords.push(record)
  })

  builtSongSlugs
    .filter((slug) => !expectedSongSlugs.has(slug))
    .forEach((slug) => failures.push(`stale Song route: ${slug}`))
  if (algoliaRecords.length !== songs.length)
    failures.push(`Algolia count ${algoliaRecords.length} != ${songs.length}`)

  const representative = songs.find(
    (song) =>
      song.languageNames.length &&
      song.contributorNames.length &&
      song.renditions.length
  )
  if (!representative) failures.push("no representative semantic Song")
  else {
    const html = fs.readFileSync(
      path.join(publicDirectory, representative.slug, "index.html"),
      "utf8"
    )
    ;[
      `<link data-react-helmet="true" rel="canonical" href="https://www.bahaisongproject.com/${representative.slug}"`,
      `https://songbook.bahaisongs.com/songs/${representative.slug}`,
      `https://www.bahaisongproject.com/${representative.slug}.pdf`,
      "Open in Songbook",
      "Download PDF",
      representative.title,
      representative.languageNames[0],
      representative.contributorNames[0],
    ].forEach((value) =>
      requireText(html, value, failures, "missing semantic page content")
    )
    const builtJson = JSON.stringify(songPageData(representative.slug))
    representative.renditions.forEach((rendition) =>
      requireText(
        builtJson,
        rendition.contentUrl,
        failures,
        "missing built rendition"
      )
    )
  }

  verifyRedirects(failures)
  filesBelow(publicDirectory)
    .filter((filePath) => filePath.endsWith(".js"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("/api/v0"))
    .forEach((filePath) => failures.push(`v0 bundle: ${filePath}`))

  if (failures.length) throw new Error(JSON.stringify({ failures }, null, 2))
  return {
    catalogEndpoint: "/v2/catalog/songs",
    songCount: songs.length,
    songRouteCount: builtSongSlugs.length,
    algoliaRecordCount: algoliaRecords.length,
    featuredSongCount: FEATURED_SONG_SLUGS.length,
    collectionRouteCount: collectionSlugs().length,
    supportedRenditions: songs.reduce(
      (count, song) => count + song.renditions.length,
      0
    ),
    staticRoutes: requiredStaticRoutes,
  }
}

async function verifyCandidate() {
  const report = verifyCandidateBuild(await getWebsiteSongs())
  process.stdout.write(
    `${JSON.stringify(
      { ...report, verifiedAt: new Date().toISOString() },
      null,
      2
    )}\n`
  )
}

if (require.main === module) {
  verifyCandidate().catch((error) => {
    process.stderr.write(`Candidate verification failed: ${error.message}\n`)
    process.exitCode = 1
  })
}

module.exports = { verifyCandidateBuild }
