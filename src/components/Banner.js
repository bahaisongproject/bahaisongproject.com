import React, { useState } from "react";
import { Link } from "gatsby";

function Banner({ children, title }) {
  const [bannerExpanded, toggleBannerExpansion] = useState(false);

  return (
    <button
      className="block min-w-full bg-blue-900 text-gray-200 p-2 focus:outline-none"
      onClick={() => toggleBannerExpansion(!bannerExpanded)}
    >
      <div
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <div className="">{title}</div>
          <svg
            className={`${bannerExpanded ? `hidden` : `w-6 inline`}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            ></path>
          </svg>
        </div>

        <div
          className={`${bannerExpanded ? `` : `hidden`} flex justify-center`}
        >
          {children}
        </div>
        <svg
            className={`${bannerExpanded ? `` : `hidden`} w-6`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            ></path>
        </svg>
      </div>
    </button>
  );
}

export default Banner;
