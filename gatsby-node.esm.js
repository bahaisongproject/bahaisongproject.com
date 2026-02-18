/* eslint-env es6 */
const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { is_youtube, get_youtube_id } = require("./src/utils/embed")
const {
  getSongsForListViews,
  getSongsForAlgolia,
  getSongDetail,
} = require("./src/utils/bsp-api")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
}) => {
  const { createNode } = actions

  try {
    const [listSongs, algoliaSongs] = await Promise.all([
      getSongsForListViews(),
      getSongsForAlgolia(),
    ])

    listSongs.forEach((song) => {
      const { id: songId, ...songFields } = song
      createNode({
        ...songFields,
        songId: songId || null,
        id: createNodeId(`bsp-list-song-${song.slug}`),
        internal: {
          type: "BspListSong",
          contentDigest: createContentDigest(song),
        },
      })
    })

    algoliaSongs.forEach((song) => {
      const { id: songId, ...songFields } = song
      createNode({
        ...songFields,
        songId: songId || null,
        id: createNodeId(`bsp-algolia-song-${song.slug}`),
        internal: {
          type: "BspAlgoliaSong",
          contentDigest: createContentDigest(song),
        },
      })
    })
  } catch (error) {
    reporter.panicOnBuild(`Error while sourcing REST songs: ${error.message}`)
  }
}

exports.createPages = async ({
  actions,
  store,
  cache,
  createNodeId,
  graphql,
  reporter,
}) => {
  const { createNode, createPage } = actions
  const allSongs = await getSongsForListViews()

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
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

  await Promise.all(
    allSongs.map(async (listSong) => {
      let song = listSong
      try {
        song = await getSongDetail(listSong.slug)
      } catch (error) {
        reporter.warn(
          `Using list payload for "${listSong.slug}" because detail fetch failed: ${error.message}`
        )
      }

      const youtubePerformances = (song.renditions || []).filter((p) =>
        is_youtube(p.contentUrl)
      )
      if (youtubePerformances.length > 0) {
        const youtubeId = get_youtube_id(youtubePerformances[0].contentUrl)
        if (youtubeId) {
          const thumbnailUrl =
            "https://img.youtube.com/vi/" + youtubeId + "/hqdefault.jpg"
          try {
            await createRemoteFileNode({
              url: thumbnailUrl, // string that points to the URL of the image
              parentNodeId: null, // id of the parent node of the fileNode you are going to create
              createNode, // helper function in gatsby-node to generate the node
              createNodeId, // helper function in gatsby-node to generate the node id
              cache, // Gatsby's cache
              store, // Gatsby's Redux store
              ext: ".jpg",
              name: song.slug,
            })
          } catch (error) {
            reporter.warn(
              `Skipping thumbnail for "${song.slug}" (${thumbnailUrl}): ${error.message}`
            )
          }
        }
      }
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
