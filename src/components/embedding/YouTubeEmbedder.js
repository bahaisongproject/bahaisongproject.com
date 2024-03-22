import React from "react"
import ResponsiveEmbed from "react-responsive-embed"
import { get_youtube_id } from "../../utils/embed"

const YouTubeEmbedder = ({ rendition }) => (
  <ResponsiveEmbed
    src={
      "https://www.youtube.com/embed/" + get_youtube_id(rendition.contentUrl)
    }
    allowFullScreen
  />
)

export default YouTubeEmbedder
