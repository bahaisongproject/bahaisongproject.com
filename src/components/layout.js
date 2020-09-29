import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import Header from "./header";

const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

function Layout({ children, className, siteName }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <InstantSearch searchClient={searchClient} indexName="bsp-songs">
        <Header siteName={siteName} />

        <main className={"flex-1 w-full mb-12 " + className}>{children}</main>

        <footer className="bg-green-blue text-white flex justify-center flex-wrap items-baseline text-sm">
          <nav className="flex p-4">
            <ul className="flex">
              <li>
                <Link className="p-2" to="/legal">
                  Legal
                </Link>
              </li>
              <li>
                <Link className="p-2" to="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="p-2" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="p-2" to="/subscribe">
                  Subscribe
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex justify-center flex-wrap items-center p-4 text-sm">
            <p>
              &copy; 2011 – {new Date().getFullYear()} bahá&apos;í song project
            </p>
          </div>
        </footer>
      </InstantSearch>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
