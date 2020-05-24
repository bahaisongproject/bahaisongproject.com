import React from "react";
import { connectHits } from "react-instantsearch-dom";
import SongList from "./SongList";

const HitListTmp = ({ hits }) => (
  <SongList songList={hits} />
);

const HitList = connectHits(HitListTmp);

export default HitList;
