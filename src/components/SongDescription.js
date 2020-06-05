import React from "react";

const SongDescription = ({ song, className }) => (
  <div className={"" + " " + className}>{song.song_description}</div>
);

export default SongDescription;
