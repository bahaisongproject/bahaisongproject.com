const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { is_youtube, get_youtube_id } = require("./src/utils/embed")

exports.createPages = async ({
  actions,
  store,
  cache,
  createNodeId,
  graphql,
  reporter,
}) => {
  const { createNode, createPage } = actions

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      bsp: bsp {
        allSongs {
          title
          slug
          description
          contributors {
            name
            slug
          }
          renditions {
            contentUrl
            prio
          }
          tags {
            id
            name
            slug
          }
          excerpts {
            id
            text
            language {
              nameEn
            }
            source {
              author
              description
              excerpts {
                id
                text
                language {
                  nameEn
                }
                source {
                  author
                  description
                }
                songs {
                  id
                  title
                  slug
                  description
                  languages {
                    nameEn
                    code
                  }
                  tags {
                    id
                    name
                    slug
                  }
                  contributors {
                    id
                    slug
                    name
                  }
                  renditions {
                    contentUrl
                  }
                }
              }
            }
          }
          languages {
            code
            nameEn
          }
        }
        allContributors {
          id
          slug
        }
        allLanguages {
          id
          code
        }
        allTags {
          id
          slug
        }
      }
      collections: allFile(
        filter: {
          sourceInstanceName: { eq: "collections" }
          extension: { in: ["md", "mdx"] }
        }
      ) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
      pages: allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          extension: { in: ["md", "mdx"] }
        }
      ) {
        nodes {
          childMdx {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // console.log(JSON.stringify(result.data.bsp.allSongs, null, 2));
  await Promise.all(
    result.data.bsp.allSongs.map(async (song) => {
      const youtubePerformances = song.renditions.filter((p) =>
        is_youtube(p.contentUrl)
      )
      let fileNode = null
      if (youtubePerformances.length > 0) {
        let fileNode = await createRemoteFileNode({
          url:
            "https://img.youtube.com/vi/" +
            get_youtube_id(youtubePerformances[0].contentUrl) +
            "/hqdefault.jpg", // string that points to the URL of the image
          parentNodeId: null, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's Redux store
          ext: ".jpg",
          name: song.slug,
        })
        // console.log(fileNode)
      }
      // console.log(fileNode)
      createPage({
        path: `/${song.slug}`,
        component: path.resolve(`./src/templates/SongTemplate.js`),
        context: {
          // songSlug: song.slug,
          song: song,
        },
      })
    })
  )

  const PageTemplate = require.resolve(`./src/templates/PageTemplate.js`)
  const CollectionTemplate = require.resolve(
    `./src/templates/CollectionTemplate.js`
  )

  const pageNodes = result.data.pages.nodes
  const collectionNodes = result.data.collections.nodes

  pageNodes.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: PageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.frontmatter.slug,
      },
    })
  })
  collectionNodes.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: CollectionTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.frontmatter.slug,
      },
    })
  })
}
