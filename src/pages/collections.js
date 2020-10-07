import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

import Results from "../components/Results";

function Collections({ data }) {
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="Collections"
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6 mb-2 prose prose-2xl">
          <h1 className="text-3xl text-gray-900 leading-tight font-extrabold">
            Collections
          </h1>
          <ul>
            {data.collections.nodes.map((node) => (
            <li key="0">
              <Link to={node.childMdx.frontmatter.slug} >
                {node.childMdx.frontmatter.title}
              </Link>
              <div className="">
              {node.childMdx.frontmatter.description}
              </div>
              </li>
            ))}
          </ul>
        </div>
      </Results>
    </Layout>
  );
}

export default Collections;

export const query = graphql`
  query {
    collections: allFile(
      filter: { sourceInstanceName: { eq: "collections" } }
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
