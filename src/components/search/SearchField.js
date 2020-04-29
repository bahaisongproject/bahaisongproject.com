import React from "react";

const SearchField = () => (
  <div className="w-full lg:px-6 xl:w-3/4 xl:px-12">
    <div className="relative">
      <span className="relative mr-6 my-2">
        <input
          type="search"
          className="w-full bg-purple-white shadow-lg rounded border-0 px-3 py-2 outline-none"
          placeholder="Search songs"
        />
      </span>
    </div>
  </div>
);

export default SearchField;
