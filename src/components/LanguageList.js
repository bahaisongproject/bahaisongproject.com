import React from "react";
import { Link } from "gatsby";

const LanguageList = ({ song }) =>
  song.languages.map((language) => (
    <div
      className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
      key="0"
    >
      <Link to={"/language/" + language.language_code}>{language.language_name_en}</Link>
    </div>
  ));

export default LanguageList;
