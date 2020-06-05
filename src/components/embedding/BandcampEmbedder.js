import React from "react";

const BandcampEmbedder = ({ performance }) => (
  <iframe
    className="border-0 w-full h-16"
    src={
      performance.content_url +
      "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true"
    }
    seamless
  />
);

export default BandcampEmbedder;
