const fs = require("fs")

const envFileContents = [
  `GATSBY_ALGOLIA_APP_ID=${process.env.GATSBY_ALGOLIA_APP_ID}`,
  `GATSBY_ALGOLIA_SEARCH_KEY=${process.env.GATSBY_ALGOLIA_SEARCH_KEY}`,
  `ALGOLIA_ADMIN_KEY=${process.env.ALGOLIA_ADMIN_KEY}`,
  `ALGOLIA_SKIP_INDEXING=${process.env.ALGOLIA_SKIP_INDEXING}`,
  `CONVEX_SITE_URL=${process.env.CONVEX_SITE_URL}`,
  `SOCIAL_IMAGES_SKIP_GENERATION=${process.env.SOCIAL_IMAGES_SKIP_GENERATION}`,
].join("\n")

fs.writeFileSync("./.env.production", `${envFileContents}\n`)

console.log("Created .env")
