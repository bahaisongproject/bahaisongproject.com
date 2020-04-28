import React from "react";
import { Link } from "gatsby";
import ResponsiveEmbed from "react-responsive-embed"

const ContentEmbedder = ({ performance }) => (
  <div className="mt-8" key="0">
    {(() => {
      if (performance.youtube_id)
        return (
          <ResponsiveEmbed
            src={"https://www.youtube.com/embed/" + performance.youtube_id}
            allowFullScreen
          />
        );
      if (performance.soundcloud_id) {
        const url =
          "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" +
          performance.soundcloud_id +
          "&color=%238bb6af";
        return (
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={url}
          ></iframe>
        );
      } else return null;
    })()}
  </div>
);

export default ContentEmbedder;
