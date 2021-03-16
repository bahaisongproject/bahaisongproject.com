import React from "react";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import SongCard from "./SongCard";

// Tabs styled in main.css
const ExcerptCard = ({ excerpt, song }) => (
  <Tabs
    className=" mt-8 mb-4"
    defaultIndex={excerpt.source.excerpts
      .map((excerpt) => excerpt.language.language_name_en)
      .findIndex(
        (language_name_en) =>
          language_name_en === excerpt.language.language_name_en
      )}
  >
    <TabList className="ml-1">
      {excerpt.source.excerpts.map((excerpt) => (
        <Tab key="0">{excerpt.language.language_name_en}</Tab>
      ))}
    </TabList>
    <TabPanels className="mt-4">
      {excerpt.source.excerpts.map((excerpt) => (
        <TabPanel key="0">
          <div className="max-w-xl border-l-4 border-bspblue my-1 p-8 xs:p-16 bg-gray-200 text-gray-900 font-sans shadow-lg rounded-sm">
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
          {(() => {
            if (excerpt.songs) {
              let songs = excerpt.songs.filter(
                (song_) => song_.slug !== song.slug
              );
              return (
                <div className="mt-8">
                  <div className="mt-2 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
                    {songs.map((song) => (
                      <div key="0" className="">
                        <SongCard song={song} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          })()}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);

export default ExcerptCard;
