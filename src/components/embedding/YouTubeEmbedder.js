import React from "react"
import ResponsiveEmbed from "react-responsive-embed"

const YouTubeEmbedder = ({ rendition }) => (
  <ResponsiveEmbed
    src={"https://www.youtube-nocookie.com/embed/" + rendition.videoId}
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
)

export default YouTubeEmbedder
