import React from "react";

const YouTubeThumbnail = ({ song }) => (
  <div className="w-56 h-28 bg-gray-300">
    {(() => {
      if (
        song.performances.length > 0 &&
        song.performances.filter((p) => p.youtube_id !== null).length > 0
      ) {
        const yt_performance = song.performances.filter(
          (p) => p.youtube_id !== null
        )[0];
        const thumbnail_url =
          "https://img.youtube.com/vi/" +
          yt_performance.youtube_id +
          "/sddefault.jpg";
        if (thumbnail_url) {
          return (
            <img
              className="h-28 w-full object-cover rounded-sm"
              src={thumbnail_url}
            />
          );
        } else {
          <div>
            <img
              className="h-28 w-full object-cover rounded-sm"
              src={"https://img.youtube.com/vi/j-9jGPOno5w/sddefault.jpg"}
            />
          </div>;
        }
      } else return null;
    })()}
  </div>
);

export default YouTubeThumbnail;
