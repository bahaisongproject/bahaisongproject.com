import React from "react";
import { Link } from "gatsby";
import Thumbnail from "./Thumbnail";
import LanguageList from "./LanguageList";
import TagList from "./TagList";
import ContributorList from "./ContributorList";
import SongDescription from "./SongDescription";

const SongCard = ({ song }) => (
  <div className="overflow-hidden">
    <Link to={song.slug}>
      <Thumbnail song={song} />
    </Link>
    <div className="pl-3 pr-1 py-2">
      <Link to={song.slug}>
        <div className="flex items-center">
          <div className="text-xl font-medium leading-snug">{song.title}</div>
        </div>
      </Link>
      <ContributorList className="text-gray-700 leading-tight" song={song} />
      {(() => {
        if (song.contributors.length === 0)
          return (
            <SongDescription
              className="text-gray-700 leading-tight"
              song={song}
            />
          );
      })()}
      <div className="flex flex-wrap">
        <LanguageList song={song} />
        <TagList song={song} />
      </div>
    </div>
  </div>
);

export default SongCard;
