const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { createOpenGraphImage } = require(`gatsby-plugin-open-graph-images`);
const { is_youtube, get_youtube_id } = require("./src/utils/embed");

exports.createPages = async ({
  actions,
  store,
  cache,
  createNodeId,
  graphql,
  reporter,
}) => {
  const { createNode, createPage } = actions;

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      bsp: bsp {
        songs {
          title
          slug
          performances {
            content_url
          }
        }
        contributors {
          contributor_id
          contributor_slug
        }
        languages {
          language_id
          language_code
        }
        tags {
          tag_id
          tag_slug
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
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  await Promise.all(
    result.data.bsp.songs.map(async (song) => {
      const youtubePerformances = song.performances.filter((p) =>
        is_youtube(p.content_url)
      );
      let fileNode = null;
      if (youtubePerformances.length > 0) {
        let fileNode = await createRemoteFileNode({
          url:
            "https://img.youtube.com/vi/" +
            get_youtube_id(youtubePerformances[0].content_url) +
            "/hqdefault.jpg", // string that points to the URL of the image
          parentNodeId: null, // id of the parent node of the fileNode you are going to create
          createNode, // helper function in gatsby-node to generate the node
          createNodeId, // helper function in gatsby-node to generate the node id
          cache, // Gatsby's cache
          store, // Gatsby's Redux store
          ext: ".jpg",
          name: song.slug,
        });
        // console.log(fileNode)
      }
      // console.log(fileNode)
      createPage({
        path: `/${song.slug}`,
        component: path.resolve(`./src/templates/SongTemplate.js`),
        context: {
          songSlug: song.slug,
          ogImage: createOpenGraphImage(createPage, {
            path: `__social/${song.slug}.png`,
            component: path.resolve(
              `src/templates/SongPreviewImageTemplate.js`
            ),
            size: {
              width: 1200,
              height: 628,
            },
            context: { songSlug: song.slug },
          }),
        },
      });
    })
  );

  result.data.bsp.contributors.forEach((contributor) => {
    createPage({
      path: `/contributor/${contributor.contributor_slug}`,
      component: path.resolve(`./src/templates/ContributorTemplate.js`),
      context: {
        contributorId: contributor.contributor_id,
      },
    });
  });

  result.data.bsp.languages.forEach((language) => {
    createPage({
      path: `/language/${language.language_code}`,
      component: path.resolve(`./src/templates/LanguageTemplate.js`),
      context: {
        languageId: language.language_id,
      },
    });
  });

  result.data.bsp.tags.forEach((tag) => {
    createPage({
      path: `/tag/${tag.tag_slug}`,
      component: path.resolve(`./src/templates/TagTemplate.js`),
      context: {
        tagId: tag.tag_id,
      },
    });
  });

  const PageTemplate = require.resolve(`./src/templates/PageTemplate.js`);
  const CollectionTemplate = require.resolve(
    `./src/templates/CollectionTemplate.js`
  );

  const pageNodes = result.data.pages.nodes;
  const collectionNodes = result.data.collections.nodes;

  pageNodes.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: PageTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.frontmatter.slug,
      },
    });
  });
  collectionNodes.forEach((node) => {
    createPage({
      path: node.childMdx.frontmatter.slug,
      component: CollectionTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.frontmatter.slug,
      },
    });
  });
};
