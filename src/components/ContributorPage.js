import { graphql } from "gatsby";
import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import PropTypes from "prop-types";
import SongGrid from "./SongGrid";
import Results from "./Results";

function ContributorPage({ data }) {
  const contributor = data.bsp.contributor;
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={contributor.contributor_name} />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h1 className="text-3xl font-semibold font-serif">
            {contributor.contributor_name}
          </h1>
  <a href={contributor.contributor_url}>{contributor.contributor_url}</a>
          <SongGrid
          className="grid mt-4 col-gap-3 row-gap-6 md:col-gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3"
          songList={contributor.songs.sort((a, b) => (a.title > b.title ? 1 : -1))}
          />
        </div>
      </Results>
    </Layout>
  );
}

ContributorPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
query($contributorId: Int!) {
    bsp {
      contributor(where: { contributor_id: $contributorId }) {
        contributor_name
        contributor_url
        songs {
          title
          slug
          contributors {
              contributor_id
              contributor_slug
              contributor_name
              contributor_url
          }
          languages {
              language_code
              language_name_en
          }
          tags {
              tag_id
              tag_name
              tag_slug
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

export default ContributorPage;
