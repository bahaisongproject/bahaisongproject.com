const songQuery = `{
    bsp {
      allSongs {
        objectID: song_id
        title
        slug
        description
        sources
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
