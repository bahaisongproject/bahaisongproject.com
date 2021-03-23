const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");
const fullConfig = resolveConfig(tailwindConfig);
const queries = require("./src/utils/algolia");
require("dotenv").config();

module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    title: `bahá'í song project`,
    description: `200+ Bahá'í songs with lyrics, chords and videos`,
    author: `Dayyan Smith`,
    siteUrl: `https://www.bahaisongproject.com`,
    keywords: [
      "bahai",
      "music",
      "songs",
      "videos",
      "chords"
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "G-5EBGT3JE8D",
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-open-graph-images`,
    },
    {
      resolve: `gatsby-plugin-eslint`,
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "BahaiSongProject",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "bsp",
        // Url to query from
        url: process.env.BSP_API_URL,
        // Refetch interval in seconds
        refetchInterval: 20,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `bahá'í song project`,
        short_name: `bsp`,
        start_url: `/`,
        background_color: `{fullConfig.theme.colors.white}`,
        theme_color: `{fullConfig.theme.colors.gray}`,
        display: `standalone`,
        icon: `src/images/logo_500x500.png`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries,
    //     chunkSize: 10000, // default: 1000
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages-md`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `collections`,
        path: `${__dirname}/src/collections`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-image`,
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-remark-images`,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              showCaptions: ["alt", "title"],
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.bahaisongproject.com`,
      },
    },
    {
      resolve: `gatsby-plugin-remove-trailing-slashes`,
    },
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
};
