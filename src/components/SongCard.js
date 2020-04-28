import React from "react";
import { Link } from "gatsby";
import YouTubeThumbnail from "./YouTubeThumbnail";

const SongCard = ({ song }) => (
  <Link to={song.slug}>
    <div className="bg-white ml-0 mt-2 mb-2 mr-4 overflow-hidden w-56 h-48 ">
      <YouTubeThumbnail song={song} />
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
              className="tracking-wide text-xs text-blue-700 my-1 mr-1 rounded-full focus:outline-none"
              key="0"
            >
              <div>[{language.language_name_en}]</div>
            </div>
          ))}
          {song.tags.map((tag) => (
            <div
              className="tracking-wide text-xs text-gray-600 my-1 mr-1 rounded-full focus:outline-none"
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
