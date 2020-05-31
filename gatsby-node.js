const path = require(`path`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      bsp {
        songs {
          title
          slug
        }
      }
    }
  `);

  result.data.bsp.songs.forEach((song) => {
    actions.createPage({
      path: `/${song.slug}`,
      component: path.resolve(`./src/components/Song.js`),
      context: {
        songSlug: song.slug,
      },
    });
  });

  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)

  const mardownPages = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
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
  mardownPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })



};
