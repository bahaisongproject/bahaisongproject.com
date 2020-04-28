import React from "react";
import ResponsiveEmbed from "react-responsive-embed"

const YouTubeEmbedder = ({ performance }) => (
    <ResponsiveEmbed
        src={"https://www.youtube.com/embed/" + performance.content_url.substring(performance.content_url.length - 11)}
        allowFullScreen
    />
);

export default YouTubeEmbedder;
