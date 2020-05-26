import React from "react";

const ExcerptCard = ({ excerpt }) => (
  <div
    className="border-l-4 max-w-xl border-gray-800 px-4 p-4 my-4 bg-gray-300 transparent text-gray-900 font-serif"
    key="0"
  >
    {(() => {
      let excerpt_text = excerpt.excerpt_text
        .split("  ")
        .map((paragraph, i) => {
          return <p key={i}>{paragraph}</p>;
        });
      return <blockquote>{excerpt_text}</blockquote>;
    })()}
    <div className="text-sm mt-2 flex flex-wrap justify-between">
      <div className="">{excerpt.source.source_author}</div>
      <div>{excerpt.source.source_description}</div>
    </div>
  </div>
);

export default ExcerptCard;
