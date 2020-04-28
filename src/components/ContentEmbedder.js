import React from "react";
import YouTubeEmbedder from "./YouTubeEmbedder";
import SoundCloudEmbedder from "./SoundCloudEmbedder";
import { is_youtube, is_soundcloud } from "../utils/embed";

const ContentEmbedder = ({ performance }) => (
  <div className="mt-8" key="0">
    {(() => {
      if (is_youtube(performance.content_url))
        return <YouTubeEmbedder performance={performance} />;
      if (is_soundcloud(performance.content_url)) {
        return <SoundCloudEmbedder performance={performance} />;
      } else return null;
    })()}
  </div>
);

export default ContentEmbedder;
