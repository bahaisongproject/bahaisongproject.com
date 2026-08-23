const songQuery = `{
    allBspSong {
      nodes {
        objectID: songId
        title
        slug
        publishedAt
        creditLine
        creditText
        contributorNames
        languageNames
        tagNames
      }
    }
  }`

const queries = [
  {
    query: songQuery,
    transformer: ({ data }) => data.allBspSong.nodes,
    indexName: `bsp-songs`,
  },
]

module.exports = queries
