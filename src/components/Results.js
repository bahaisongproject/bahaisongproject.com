import React from "react";
import { connectStateResults, PoweredBy } from "react-instantsearch-dom";
import HitList from "./HitList";

const Results = connectStateResults(({ children, searchState }) =>
  searchState && searchState.query ? (
    <>
      <div className="flex justify-center px-4 mt-6 mb-2">
        <h1 className="text-2xl text-gray-900 leading-none font-extrabold">
          Search Results
        </h1>
      </div>
      <HitList />
      <div className="flex justify-center mt-8">
        <PoweredBy />
      </div>
    </>
  ) : (
    children
  )
);

export default Results;
