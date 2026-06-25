const pageModules = import.meta.glob("../pages-md/**/*.{md,mdx}", {
  eager: true,
})
const collectionModules = import.meta.glob("../collections/**/*.{md,mdx}", {
  eager: true,
})
const collectionRawModules = import.meta.glob("../collections/**/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
})

function normalizeRoute(slug) {
  return String(slug || "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
}

function toEntry([file, module]) {
  const frontmatter = module.frontmatter || {}
  return {
    file,
    frontmatter,
    route: normalizeRoute(frontmatter.slug),
    Content: module.Content || module.default,
  }
}

export function getPageEntries() {
  return Object.entries(pageModules)
    .map(toEntry)
    .filter((entry) => entry.route && entry.Content)
}

export function getCollectionEntries() {
  return Object.entries(collectionModules)
    .map(toEntry)
    .filter((entry) => entry.route && entry.Content)
}

function countUniqueSongSlugs(raw) {
  if (!raw) return 0
  const slugPattern = /songSlugs\s*=\s*\{*\s*\[([\s\S]*?)\]\s*\}*\s*/g
  const slugSet = new Set()
  let match
  while ((match = slugPattern.exec(raw)) !== null) {
    const inner = match[1]
    const stringPattern = /["'`]([^"'`]+)["'`]/g
    let innerMatch
    while ((innerMatch = stringPattern.exec(inner)) !== null) {
      slugSet.add(innerMatch[1].trim())
    }
  }
  return slugSet.size
}

export function getCollectionEntriesWithSongCounts() {
  return Object.entries(collectionModules)
    .map(([file, module]) => {
      const entry = toEntry([file, module])
      const raw = collectionRawModules[file] || ""
      return {
        ...entry,
        songCount: countUniqueSongSlugs(raw),
      }
    })
    .filter((entry) => entry.route && entry.Content)
}

export function normalizeRouteSlug(slug) {
  return normalizeRoute(slug)
}
