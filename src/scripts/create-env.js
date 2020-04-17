const fs = require('fs')
fs.writeFileSync('./.env.production', `GATSBY_ALGOLIA_APP_ID=${process.env.GATSBY_ALGOLIA_APP_ID}\n`)
fs.writeFileSync('./.env.production', `GATSBY_ALGOLIA_SEARCH_KEY=${process.env.GATSBY_ALGOLIA_SEARCH_KEY}\n`)
fs.writeFileSync('./.env.production', `ALGOLIA_ADMIN_KEY=${process.env.ALGOLIA_ADMIN_KEY}\n`)
fs.writeFileSync('./.env.production', `BSP_API_URL=${process.env.BSP_API_URL}\n`)

console.log("Created .env")
