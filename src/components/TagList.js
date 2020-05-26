import React from "react";

const TagList = ({ song }) =>
  song.tags.map((tag) => (
    <div
      className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
      key="0"
    >
      <div>{tag.tag_name}</div>
    </div>
  ));

export default TagList;
