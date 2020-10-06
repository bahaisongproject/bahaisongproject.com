import React from "react";

const SongShowcaseGrid = ({ children }) => (
  <div className="grid mt-4 col-gap-3 row-gap-6 md:col-gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
    {children}
  </div>
);

export default SongShowcaseGrid;
