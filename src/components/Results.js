import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import HitList from "./HitList";


const Results = connectStateResults(({ children, searchState }) =>
  searchState && searchState.query ? (
    (
      <>
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h1 className="text-6xl font-extrabold">Search Results</h1>
      </div>
      <HitList />
      </>
    )
  ) : (
    children
  )
);

export default Results;
