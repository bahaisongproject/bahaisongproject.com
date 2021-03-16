const songQuery = `{
    bsp {
        songs {
          objectID: song_id
          title
          slug
          song_description
          languages {
            language_code
            language_name_en
            language_name_native
          }
          contributors {
            contributor_id
            contributor_name
            contributor_slug
          }
          tags {
            tag_id
            tag_name
            tag_description
            tag_slug
          }
          performances {
            content_url
            performance_prio
          }
          excerpts {
            source {
              source_description
              source_author
            }
            excerpt_text
          }
        }
      }
  }`;

const queries = [
  {
    query: songQuery,
    transformer: ({ data }) => data.bsp.songs,
    indexName: `bsp-songs`,
  },
];

module.exports = queries;
