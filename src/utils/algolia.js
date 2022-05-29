const songQuery = `{
    bsp {
      allSongs {
        objectID: id
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
          code
          nameEn
          nameNative
        }
        contributors {
          id
          name
          slug
        }
        tags {
          id
          name
          description
          slug
        }
        renditions {
          contentUrl
          prio
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
  }`;

const queries = [
  {
    query: songQuery,
    transformer: ({ data }) => data.bsp.allSongs,
    indexName: `bsp-songs`,
  },
];

module.exports = queries;
