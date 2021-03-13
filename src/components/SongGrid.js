import React from "react";
import SongCard from "./SongCard";

const SongGrid = ({ songList, className, children }) => (
  <div
    className={
      "grid col-gap-3 row-gap-6 md:col-gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3" +
      " " +
      className
    }
  >
    {children}
  </div>
);

export default SongGrid;
