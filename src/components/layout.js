import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from 'react';
import { navigate } from "gatsby"
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import qs from 'qs';
import Header from "./header";
import Footer from "./footer";

const DEBOUNCE_TIME = 400;
const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToUrl = (location, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

const urlToSearchState = location => qs.parse(location.search.slice(1));

function Layout({ children, location }) {
  const [searchState, setSearchState] = useState(urlToSearchState(location));
  const debouncedSetStateRef = useRef(null);

  function onSearchStateChange(updatedSearchState) {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      navigate(searchStateToUrl(location, updatedSearchState));
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  }

  useEffect(() => {
    setSearchState(urlToSearchState(location));
  }, [location]);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="bsp-songs"
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}

    >
      <div className="min-h-screen flex flex-col text-gray-900 bg-primary">
        <Header />
        <main className="flex-1 w-full mb-12">{children}</main>
        <Footer />
      </div>
    </InstantSearch>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.object.isRequired,
};

export default Layout;
