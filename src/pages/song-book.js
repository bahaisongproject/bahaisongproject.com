import React from "react";

import LayoutSong from "../components/layout_song";
import SEO from "../components/seo";

function SongBookPage() {
  return (
    <LayoutSong>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="About" />
      <div>
        Download a PDF with all songs{" "}
        <a
          href="https://pdf.bahaisongproject.com/songbook.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          here
        </a>
        .
      </div>
    </LayoutSong>
  );
}

export default SongBookPage;
