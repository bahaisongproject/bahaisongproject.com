import { Link } from "gatsby";
import React from "react";

const ContributorList = ({ song, className }) => (
  <div className="flex flex-wrap">
    {song.contributors.map((contributor, i) => (
      <div className={"contributor-name " + className} key="0">
        <Link to={"/contributor/" + contributor.contributor_slug}>
          {contributor.contributor_name}
        </Link>
      </div>
    ))}
  </div>
);

export default ContributorList;
