import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function SongBookPage() {
  return (
    <Layout className="max-w-4xl">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Song Book" />
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
    </Layout>
  );
}

export default SongBookPage;
