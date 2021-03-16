import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import CustomSearchBox from "./SearchBox";
import logo from "../images/logo_100x100.png";

const searchIndices = [
  { name: `bsp-songs`, title: `Songs`, hitComp: `SongHit` },
];

function Header({ siteName }) {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="bg-gradient-to-r from-bspgreen to-bspblue">
      <div className="flex flex-wrap items-center justify-between p-4 mx-auto md:px-8 xs:py-4 md:py-4">
        <Link to="/">
          <h1 className="flex items-center text-white no-underline">
            <img src={logo} alt="Logo" className="w-8" />
            <div className="flex">
              <div className="text-xl font-serif tracking-normal font-bold ml-1">
                {site.siteMetadata.title}
              </div>
            </div>
          </h1>
        </Link>
        <div className={`flex-grow ml-16 mr-8 hidden lg:block`}>
          <CustomSearchBox />
        </div>
        <button
          className="flex items-center px-3 py-2 text-white md:hidden focus:outline-none"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className={isExpanded ? `hidden` : `w-6 fill-current`}
            viewBox="0 0 20 20"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className={isExpanded ? `w-6 fill-current` : `hidden`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <nav
          className={`${
            isExpanded ? `` : `hidden`
          } md:flex md:items-baseline w-full md:w-auto`}
        >
          {[
            {
              route: `/all-songs`,
              title: `All Songs`,
              className: `${isExpanded ? `` : `text-3xl font-bold`}`,
            },
            {
              route: `/collections`,
              title: `Collections`,
              className: `${isExpanded ? `` : ``}`,
            },
            {
              route: `/songbook`,
              title: `Song Book`,
              className: ``,
            },
            {
              route: `/contact`,
              title: `Contact`,
              className: ``,
            },
            {
              route: `/about`,
              title: `About`,
              className: ``,
            },
          ].map((link) => (
            <Link
              className={
                "block mt-4 text-lg  text-white no-underline md:inline-block md:mt-0 md:ml-6" +
                " " +
                link.className
              }
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className={`flex justify-center mb-4 mx-4 lg:hidden`}>
        <CustomSearchBox />
      </div>
    </header>
  );
}

export default Header;
