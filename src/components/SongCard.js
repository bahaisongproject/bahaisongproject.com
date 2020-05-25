import React from "react";
import { Link } from "gatsby";
import Thumbnail from "./Thumbnail";

const SongCard = ({ song }) => (
  <Link
    to={song.slug}
    className="flex-grow my-4 xs:mx-4 w-full xs:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
  >
    <div className="overflow-hidden">
      <Thumbnail song={song} />
      <div className="pl-3 pr-1 py-2">
        <div className="flex items-center font-semibold">
          <span className="text-xl">{song.title}</span>
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
              className="tracking-wide text-xs border text-gray-600 bg-gray-100 my-1 mr-1 px-1 rounded-sm focus:outline-none"
              key="0"
            >
              <div>{language.language_name_en}</div>
            </div>
          ))}
          {song.tags.map((tag) => (
            <div
              className="tracking-wide text-xs border text-gray-600 bg-gray-100 my-1 mr-1 px-1 rounded-sm focus:outline-none"
              key="0"
            >
              <div>{tag.tag_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default SongCard;
