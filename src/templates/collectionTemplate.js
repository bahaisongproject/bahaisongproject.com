import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Results from "../components/Results";
import { MDXRenderer } from "gatsby-plugin-mdx";
import MDXWrapper from "../components/MDXWrapper";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { mdx } = data; // data.mdx holds your post data
  const { frontmatter, body } = mdx;
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title={frontmatter.title}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h2 className="text-lg text-gray-700">Collection</h2>
          <h1 className="mb-8 text-5xl text-gray-900 font-extrabold leading-tight">
            {frontmatter.title}
          </h1>
          <MDXWrapper>
            {/* for short codes */}
            <MDXRenderer>{body}</MDXRenderer>
          </MDXWrapper>
        </div>
      </Results>
    </Layout>
  );
}
export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;
