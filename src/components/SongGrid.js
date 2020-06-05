import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songList }) => (
  <div className="flex flex-wrap w-full">
    {songList.map((hit) => (
      <div key={hit.objectID} className="flex-grow my-4 xs:mx-4 w-full xs:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6">
        <SongCard song={hit} />
      </div>
    ))}
  </div>
);

export default SongGrid;
