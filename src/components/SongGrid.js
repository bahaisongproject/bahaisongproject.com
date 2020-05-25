import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songList }) => (
  <div className="flex flex-wrap w-full">
    {songList.map((hit) => (
      <SongCard song={hit} key={hit.objectID} />
    ))}
  </div>
);

export default SongGrid;
