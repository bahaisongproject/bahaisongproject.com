import React from "react"
import SongCard from "./SongCard"

const SongGrid = ({ songList, className, children }) => (
  <div
    className={
      "grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3" +
      " " +
      className
    }
  >
    {children}
  </div>
)

export default SongGrid
