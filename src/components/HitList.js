import React from "react";
import { connectHits } from "react-instantsearch-dom";
import SongGrid from "./SongGrid";
import SongCard from "./SongCard";

const HitListTmp = ({ hits }) => {
  return (
    <div className="mt-4 xs:mx-3 md:mx-4 lg:grid-cols-4 xl:grid-cols-5 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
      {(() => {
        if (hits) {
          return hits.map((song) => <SongCard key={song.slug} song={song} />);
        }
      })()}
    </div>
  );
};

const HitList = connectHits(HitListTmp);

export default HitList;
