import PropTypes from "prop-types";
import React from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import Header from "./header";
import Footer from "./footer";

const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

function Layout({ children, siteName }) {
  return (
    <InstantSearch searchClient={searchClient} indexName="bsp-songs">
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
};

export default Layout;
