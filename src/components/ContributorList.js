import React from "react";

const ContributorList = ({ song, className }) => (
  <div className="flex flex-wrap">
    {song.contributors.map((contributor, i) => (
      <div className={"contributor-name " + className} key="0">
        {contributor.contributor_name}
      </div>
    ))}
  </div>
);

export default ContributorList;
