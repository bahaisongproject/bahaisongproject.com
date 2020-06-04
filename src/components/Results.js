import React from "react";
import { connectStateResults } from "react-instantsearch-dom";

const Results = connectStateResults(
    ({ searchState, searchResults, children }) => 
      searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : (
        <div className="flex justify-center">
            <div className="text-xl">No results</div>
        </div>
      )
  );

export default Results;
