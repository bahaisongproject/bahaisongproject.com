import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import Results from "../components/Results";

function Collections({ data, location }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };
  return (
    <Layout location={location}>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="Collections"
        image={image}
        description="Find a song you like in one of our 10 curated collections"
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6 mb-2">
          <h1 className="mb-8 text-3xl text-gray-900 leading-tight font-extrabold">
            Collections
          </h1>
          <div className="prose prose-2xl">
            {data.collections.nodes
              .sort((a, b) =>
                a.childMdx.frontmatter.title > b.childMdx.frontmatter.title
                  ? 1
                  : -1
              )
              .map((node, i) => (
                <div key={i} className="mt-8">
                  <Link
                    to={node.childMdx.frontmatter.slug}
                    className="leading-tight"
                  >
                    {node.childMdx.frontmatter.title}
                  </Link>
                  <div>{node.childMdx.frontmatter.description}</div>
                </div>
              ))}
          </div>
        </div>
      </Results>
    </Layout>
  );
}

export default Collections;

export const query = graphql`
  query {
    collections: allFile(
      filter: {
        sourceInstanceName: { eq: "collections" }
        extension: { in: ["md", "mdx"] }
      }
    ) {
      nodes {
        childMdx {
          frontmatter {
            slug
            title
            description
          }
        }
      }
    }
  }
`;
