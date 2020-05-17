import React from "react";

const SearchField = () => (
  <div className="w-full md:max-w-md">
    <div className="relative ">
      <span className="">
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
