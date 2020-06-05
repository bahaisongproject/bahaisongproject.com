import React from "react";
import { Link } from "gatsby";
import Thumbnail from "./Thumbnail";
import LanguageList from "./LanguageList";
import TagList from "./TagList";
import ContributorList from "./ContributorList";
import SongDescription from "./SongDescription"

const SongCard = ({ song }) => (
  <div className="flex-grow my-4 xs:mx-4 w-full xs:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
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
            return <SongDescription className="text-gray-700 leading-tight" song={song} />;
        })()}
        <div className="flex flex-wrap">
          <LanguageList song={song} />
          <TagList song={song} />
        </div>
      </div>
    </div>
  </div>
);

export default SongCard;
