import React from "react";

const BandcampEmbedder = ({ performance }) => (
  // <iframe
  //   src={
  //     performance.content_url +
  //     "transparent=true/size=small/bgcol=ffffff/linkcol=0687f5"
  //   }
  //   width="100%"
  //   height="100%"
  //   scrolling="no"
  //   frameBorder="no"
  //   allow="autoplay"
  // />
  <iframe className="border-0 w-full h-16" src="https://bandcamp.com/EmbeddedPlayer/album=1109313778/size=small/bgcol=ffffff/linkcol=0687f5/track=1768643286/transparent=true/" seamless />
);

export default BandcampEmbedder;
