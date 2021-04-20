import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <input
    type="search"
    value={currentRefinement}
    placeholder="Search for songs"
    onChange={(event) => refine(event.currentTarget.value)}
    className="appearance-none truncate bg-gray-200 outline-none rounded-md pl-3 pr-2 py-2 w-full"
  />
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
