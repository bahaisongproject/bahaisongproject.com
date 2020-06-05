import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songList }) => (
  <div className="grid mt-6 mx-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {songList.map((hit) => (
      <div key={hit.objectID} className="px-2">
        <SongCard song={hit} />
      </div>
    ))}
  </div>
);

export default SongGrid;
