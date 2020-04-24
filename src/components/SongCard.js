import React from "react";
import { Link } from "gatsby";

const SongCard = ({ song }) => (
  <Link to={song.slug}>
    <div className="bg-white ml-0 mt-2 mb-2 mr-4 overflow-hidden w-56 h-48 ">
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
      <div className="py-1">
        <div className="flex items-center font-semibold">
          <span className="truncate">{song.title}</span>
        </div>
        <div className="flex text-xs truncate">
          {song.contributors.map((contributor, i) => (
            <div key="0">
              <span>{i < 1 || ", "}</span>
              <span>{contributor.contributor_name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
          {song.languages.map((language) => (
            <div
              className="tracking-wide text-xs text-blue-500 my-1 rounded-full focus:outline-none"
              key="0"
            >
              <div>[{language.language_name_en}]</div>
            </div>
          ))}
          {song.tags.map((tag) => (
            <div
              className="tracking-wide text-xs text-green-700 my-1 mx-1 rounded-full focus:outline-none"
              key="0"
            >
              <div>[{tag.tag_name}]</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default SongCard;
