import React from "react";
import ResponsiveEmbed from "react-responsive-embed";
import { get_youtube_id } from "../../utils/embed";

const YouTubeEmbedder = ({ performance }) => (
  <ResponsiveEmbed
    src={
      "https://www.youtube.com/embed/" + get_youtube_id(performance.content_url)
    }
    allowFullScreen
  />
);

export default YouTubeEmbedder;
