import React from "react"

const BandcampEmbedder = ({ rendition }) => (
  <iframe
    className="border-0 w-full h-16"
    src={
      rendition.contentUrl +
      "/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true"
    }
    seamless
  />
)

export default BandcampEmbedder
