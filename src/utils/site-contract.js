const FEATURED_SONG_SLUGS = [
  "observe-all-the-things",
  "die-erde-ist-nur-ein-land",
  "god-is-sufficient-unto-me",
  "o-fils-de-lexistence",
  "ey-yalla",
]

const ALGOLIA_RECORD_FIELDS = [
  "objectID",
  "title",
  "slug",
  "publishedAt",
  "creditLine",
  "creditText",
  "contributorNames",
  "languageNames",
  "tagNames",
]

module.exports = { ALGOLIA_RECORD_FIELDS, FEATURED_SONG_SLUGS }
