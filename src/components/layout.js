import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import Header from "./header";

const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

const Hit = ({ hit }) => <p><Link to={"/" + hit.slug}>{hit.title}</Link></p>;

function Layout({ children, className }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main
        className={
          "flex-1 w-full px-4 py-4 mx-auto md:px-8 md:py-8 " + className
        }
      >
        <InstantSearch searchClient={searchClient} indexName="bsp-songs">
          <div className="flex justify-center mb-6">
            <SearchBox />
          </div>
          <Hits hitComponent={Hit} />
        </InstantSearch>
        {children}
      </main>

      <footer className="bg-gray-600">
        <nav className="flex justify-center max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white">&copy; bahá&apos;í song project</p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
