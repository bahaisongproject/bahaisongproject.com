import { graphql } from "gatsby";
import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import PropTypes from "prop-types";
import SongGrid from "./SongGrid";
import Results from "./Results";

function TagPage({ data }) {
  const tag = data.bsp.tag;
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={tag.tag_name} />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h1 className="text-3xl font-semibold font-serif">
            {"Tag: " + tag.tag_name}
          </h1>
          <div>{tag.tag_description}</div>
          <SongGrid
          className="grid mt-4 col-gap-3 row-gap-6 md:col-gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
          songList={tag.songs.sort((a, b) => (a.title > b.title ? 1 : -1))}
          />
        </div>
      </Results>
    </Layout>
  );
}

TagPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
query($tagId: Int!) {
    bsp {
      tag(where: { tag_id: $tagId }) {
        tag_name
        tag_description
        songs {
          title
          slug
          contributors {
              contributor_id
              contributor_name
          }
          languages {
              language_code
              language_name_en
          }
          tags {
              tag_id
              tag_name
          }
          performances {
              performance_prio
              content_url
          }
        }
      }
    }
}
`;

export default TagPage;
