import React from "react";
import { OutboundLink } from "gatsby-plugin-gtag";

const DownloadButton = ({ children, url }) => (
  <OutboundLink href={url} target="_blank" rel="noopener noreferrer">
    <button className="flex items-center font-medium text-gray-100 bg-emerald py-2 px-4 mt-4 rounded-full whitespace-no-wrap focus:outline-none">
      {children}
      <svg className="fill-current stroke-current w-4 ml-1" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
      </svg>
    </button>
  </OutboundLink>
);

export default DownloadButton;
