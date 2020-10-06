import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function ProseWrapper({ children }) {
  return <div className="mt-8 prose prose-lg">{children}</div>;
}
