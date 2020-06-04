import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import HitList from "./HitList";


const PageResults = connectStateResults(({ children, searchState }) =>
  searchState && searchState.query ? (
    <HitList />
  ) : (
    children
  )
);

export default PageResults;
