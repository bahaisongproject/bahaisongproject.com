const songQuery = `{
    bsp {
        songs {
          title
          slug
          languages {
            language_name_en
            language_name_native
          }
          contributors {
            contributor_name
          }
          tags {
            tag_name
            tag_description
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
  }`

const queries = [{
    query: songQuery,
    transformer: ({ data }) => data.bsp.songs,
    indexName: `bsp-songs`,
}]

module.exports = queries