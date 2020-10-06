import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Song from "./SongShowcase";
import SongCollection from "./SongShowcaseGrid";
import Prose from '../components/ProseWrapper'

const shortcodes = { Song, SongCollection, Prose };

export default function MDXWrapper({ children }) {
  return <MDXProvider components={shortcodes}>{children}</MDXProvider>;
}
