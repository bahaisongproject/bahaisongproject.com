import React from "react";
import { connectHits } from "react-instantsearch-dom";
import SongList from "./SongList";

const Hits = ({ hits }) => (
  <SongList songList={hits} />
);

const CustomHits = connectHits(Hits);

export default CustomHits;
