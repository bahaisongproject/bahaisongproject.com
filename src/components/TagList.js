import React from "react";
import { Link } from "gatsby";

const TagList = ({ song }) =>
  song.tags.map((tag) => (
    <div
      className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
      key="0"
    >
      <Link to={"/tag/" + tag.tag_id}>{tag.tag_name}</Link>
    </div>
  ));

export default TagList;
