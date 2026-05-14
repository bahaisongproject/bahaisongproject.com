const songQuery = `{
    allBspAlgoliaSong {
      nodes {
        objectID: slug
        title
        slug
        description
        publishedAt
        sources {
          description
          author
        }
        music
        words
        languages {
          nameEn
        }
        contributors {
          name
          slug
        }
        tags {
          name
          description
          slug
        }
        renditions {
          contentUrl
        }
        excerpts {
          source {
            description
            author
          }
          text
        }
      }
    }
  }`

const queries = [
  {
    query: songQuery,
    transformer: ({ data }) => data.allBspAlgoliaSong.nodes,
    indexName: `bsp-songs`,
  },
]

module.exports = queries
