import React from "react";

import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import SongCard from "./SongCard";

// Tabs styled in main.css
const ExcerptCard = ({ excerpt, song }) => (
  <Tabs
    className=" mt-8 mb-4"
    defaultIndex={excerpt.source.excerpts
      .map((excerpt) => excerpt.language.nameEn)
      .findIndex(
        (nameEn) =>
        nameEn === excerpt.language.nameEn
      )}
  >
    <TabList className="ml-1">
      {excerpt.source.excerpts.map((excerpt, i) => (
        <Tab key={i}>{excerpt.language.nameEn}</Tab>
      ))}
    </TabList>
    <TabPanels className="mt-4">
      {excerpt.source.excerpts.map((excerpt, i) => (
        <TabPanel key={i}>
          <div className="max-w-xl border-primary-500 my-1 p-8 xs:p-16 bg-primary-50 text-gray-900 font-sans shadow-lg rounded-sm">
            <div className="">
              {(() => {
                let excerpt_text = excerpt.text
                  .split("  ")
                  .map((paragraph, i) => {
                    return <p key={i}>{paragraph}</p>;
                  });
                return <blockquote>{excerpt_text}</blockquote>;
              })()}
            </div>
            <div className="text-sm mt-8 flex flex-wrap justify-between">
              <div className="mt-2">{excerpt.source.author}</div>
              <div className="mt-2">{excerpt.source.description}</div>
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
                    {songs.map((song, i) => (
                      <div key={i} className="">
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
