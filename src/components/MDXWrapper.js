import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Song from "./SongShowcase";
import SongCollection from "./SongShowcaseGrid";

const shortcodes = { Song, SongCollection };

export default function MDXWrapper({ children }) {
  return <MDXProvider components={shortcodes}>{children}</MDXProvider>;
}
