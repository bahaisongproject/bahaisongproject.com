import React from "react";
import ExcerptCard from "./ExcerptCard";

const ExcerptList = ({ song }) =>
  song.excerpts.map((excerpt) => <ExcerptCard excerpt={excerpt} song={song} key="0" />);

export default ExcerptList;
