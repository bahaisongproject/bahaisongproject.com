import React from "react";
import SongCard from "./SongCard";

const SongList = ({ songList }) => (
        <div className="flex flex-wrap w-full">
            {songList.map((hit) => (
            <SongCard song={hit} key={hit.objectID} />
            ))}
        </div>
);

export default SongList;
