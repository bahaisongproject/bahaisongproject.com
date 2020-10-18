import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songList, className }) => (
  <div
    className={
      className
        ? className
        : "grid mt-4 xs:mx-3 col-gap-3 row-gap-6 md:col-gap-4 md:mx-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    }
  >
    {(() => {
      if (songList) {
        return songList.map((hit) => (
          <div key={hit.objectID} className="">
            <SongCard song={hit} />
          </div>
        ));
      }
    })()}
  </div>
);

export default SongGrid;
