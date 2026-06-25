const pageModules = import.meta.glob("../pages-md/**/*.{md,mdx}", {
  eager: true,
})
const collectionModules = import.meta.glob("../collections/**/*.{md,mdx}", {
  eager: true,
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

export function normalizeRouteSlug(slug) {
  return normalizeRoute(slug)
}
