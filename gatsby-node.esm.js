/* eslint-env es6 */
const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { getWebsiteSongs } = require("./src/utils/bsp-api")

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
}) => {
  try {
    const songs = await getWebsiteSongs()
    songs.forEach((song) => {
      actions.createNode({
        ...song,
        id: createNodeId(`bsp-song-${song.songId}`),
        internal: { type: "BspSong", contentDigest: createContentDigest(song) },
      })
    })
  } catch (error) {
    reporter.panicOnBuild(
      `Error while sourcing REST v2 Catalog: ${error.message}`
    )
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
      songs: allBspSong {
        nodes {
          songId
          slug
          renditions {
            provider
            contentUrl
            videoId
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  await Promise.all(
    result.data.songs.nodes.map(async (song) => {
      const youtube = song.renditions.find(
        (rendition) => rendition.provider === "youtube"
      )
      if (youtube) {
        const thumbnailUrl = `https://img.youtube.com/vi/${youtube.videoId}/hqdefault.jpg`
        try {
          await createRemoteFileNode({
            url: thumbnailUrl,
            parentNodeId: null,
            createNode,
            createNodeId,
            cache,
            store,
            ext: ".jpg",
            name: song.slug,
          })
        } catch (error) {
          reporter.warn(
            `Skipping thumbnail for "${song.slug}" (${thumbnailUrl}): ${error.message}`
          )
        }
      }
      createPage({
        path: `/${song.slug}`,
        component: path.resolve(`./src/templates/SongTemplate.js`),
        context: { songId: song.songId },
      })
    })
  )

  const PageTemplate = require.resolve(`./src/templates/PageTemplate.js`)
  const CollectionTemplate = require.resolve(
    `./src/templates/CollectionTemplate.js`
  )
  result.data.pages.nodes.forEach((node) =>
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: PageTemplate,
      context: { slug: node.childMdx.frontmatter.slug },
    })
  )
  result.data.collections.nodes.forEach((node) =>
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: CollectionTemplate,
      context: { slug: node.childMdx.frontmatter.slug },
    })
  )
}
