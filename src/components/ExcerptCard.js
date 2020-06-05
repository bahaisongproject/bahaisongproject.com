import React from "react";

const ExcerptCard = ({ excerpt }) => (
  <div
    className="border-l-4 max-w-xl border-gray-800 p-8 xs:p-16 my-4 bg-gray-200 transparent text-gray-900 font-serif shadow-lg rounded-sm"
    key="0"
  >
    <div className="">
      {(() => {
        let excerpt_text = excerpt.excerpt_text
          .split("  ")
          .map((paragraph, i) => {
            return <p key={i}>{paragraph}</p>;
          });
        return <blockquote>{excerpt_text}</blockquote>;
      })()}
    </div>
    <div className="text-sm mt-8 flex flex-wrap justify-between">
      <div className="mt-2">{excerpt.source.source_author}</div>
      <div className="mt-2">{excerpt.source.source_description}</div>
    </div>
  </div>
);

export default ExcerptCard;
