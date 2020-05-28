import React from "react";
import { is_youtube, get_youtube_id } from "../utils/embed";

const Thumbnail = ({ song }) => (
  <div
    className="bg-green-blue relative pt-14/25 bg-gray-200 xs:rounded-sm"
  >
    {(() => {
      if (
        song.performances.length > 0 &&
        song.performances.filter((p) => is_youtube(p.content_url)).length > 0
      ) {
        const yt_performance = song.performances
          .filter((p) => is_youtube(p.content_url))
          .sort((a, b) =>
            a.performance_prio > b.performance_prio ? 1 : -1
          )[0];
        const thumbnail_url =
          "https://img.youtube.com/vi/" +
          get_youtube_id(yt_performance.content_url) +
          "/hqdefault.jpg";
        return (
          <img
            className="absolute top-0 left-0 h-full w-full object-cover xs:rounded-sm"
            src={thumbnail_url}
          />
        );
      }
    })()}
  </div>
);

export default Thumbnail;
