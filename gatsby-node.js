const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
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
};
