import React from "react";

const SearchField = () => (
  <div className="flex justify-center mb-6">
    <input
      type="search"
      className="w-full md:max-w-md shadow-lg rounded px-3 py-2 outline-none"
      placeholder="Search songs"
    />
  </div>
);

export default SearchField;
