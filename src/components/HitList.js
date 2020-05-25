import React from "react";
import { connectHits } from "react-instantsearch-dom";
import SongGrid from "./SongGrid";

const HitListTmp = ({ hits }) => (
  <SongGrid songList={hits} />
);

const HitList = connectHits(HitListTmp);

export default HitList;
