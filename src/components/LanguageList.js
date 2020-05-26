import React from "react";

const LanguageList = ({ song }) =>
  song.languages.map((language) => (
    <div
      className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
      key="0"
    >
      <div>{language.language_name_en}</div>
    </div>
  ));

export default LanguageList;
