import React from "react";

const SoundCloudEmbedder = ({ rendition }) => (
  <iframe
    src={
      "https://w.soundcloud.com/player/?url=" +
      rendition.contentUrl +
      "&color=%238bb6af"
    }
    width="100%"
    height="166"
    scrolling="no"
    frameBorder="no"
    allow="autoplay"
  />
);

export default SoundCloudEmbedder;
