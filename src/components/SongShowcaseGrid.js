import React from "react";
import SongGrid from "./SongGrid";

const SongShowcaseGrid = ({ children }) => (
  <SongGrid className="mt-16 mb-16">{children}</SongGrid>
);

export default SongShowcaseGrid;
