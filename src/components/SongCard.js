import React from "react";
import { Link } from "gatsby";
import Thumbnail from "./Thumbnail";

const SongCard = ({ song }) => (
  <div className="overflow-hidden">
    <Link to={`/` + song.slug}>
      <Thumbnail song={song} />
    </Link>
    <div className="pl-3 pr-1 py-2">
      <Link to={`/` + song.slug}>
        <div className="flex items-center">
          <div className=" text-xl font-medium leading-snug">{song.title}</div>
        </div>
      </Link>

      {/* Contributors */}
      <div className="flex flex-wrap">
        {song.contributors.map((contributor, i) => (
          <div
            className={
              "contributor-name text-gray-700 leading-tight text-lg mt-1"
            }
            key="0"
          >
            <Link to={"/contributor/" + contributor.contributor_slug}>
              {contributor.contributor_name}
            </Link>
          </div>
        ))}
      </div>

      {/* Show song description if no contributors, if available */}
      {(() => {
        if (song.contributors.length === 0)
          return (
            <div className="text-gray-700 leading-tight">
              {song.song_description}
            </div>
          );
      })()}

      {/* Show languages and tags under song title */}
      <div className="flex flex-wrap">
        {/* Languages */}
        {song.languages.map((language) => (
          <div
            className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
            key="0"
          >
            <Link to={"/language/" + language.language_code}>
              {language.language_name_en}
            </Link>
          </div>
        ))}
        {/* Tags */}
        {song.tags.map((tag) => (
          <div
            className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
            key="0"
          >
            <Link to={"/tag/" + tag.tag_slug}>{tag.tag_name}</Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SongCard;
