import React from "react";

const ContributorList = ({ song }) => (
  <div className="flex flex-wrap">
    {song.contributors.map((contributor, i) => (
      <div className="contributor-name text-lg" key="0">
        {contributor.contributor_name}
      </div>
    ))}
  </div>
);

export default ContributorList;
