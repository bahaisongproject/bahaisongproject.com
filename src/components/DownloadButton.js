import React from "react";

const DownloadButton = ({ song }) => (
  <a
    href={"https://pdf.bahaisongproject.com/" + song.slug + ".pdf"}
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="text-gray-100 bg-gray-900 py-2 px-4 mt-4 rounded-full inline-block focus:outline-none">
      Download PDF
    </button>
  </a>
);

export default DownloadButton;
