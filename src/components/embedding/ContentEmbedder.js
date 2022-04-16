import React from "react";
import YouTubeEmbedder from "./YouTubeEmbedder";
import SoundCloudEmbedder from "./SoundCloudEmbedder";
import BandcampEmbedder from "./BandcampEmbedder";
import { is_youtube, is_soundcloud, is_bandcamp } from "../../utils/embed";

const ContentEmbedder = ({ rendition }) => (
  <div className="mt-8">
    {(() => {
      if (is_youtube(rendition.contentUrl))
        return <YouTubeEmbedder rendition={rendition} />;
      if (is_soundcloud(rendition.contentUrl)) {
        return <SoundCloudEmbedder rendition={rendition} />;
      }
      if (is_bandcamp(rendition.contentUrl)) {
        return <BandcampEmbedder rendition={rendition} />;
      } else return null;
    })()}
  </div>
);

export default ContentEmbedder;
