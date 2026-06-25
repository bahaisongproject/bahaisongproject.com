import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://www.bahaisongproject.com",
  trailingSlash: "never",
  publicDir: "./static",
  integrations: [mdx(), react(), sitemap()],
})
