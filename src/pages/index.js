import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import { PoweredBy } from "react-instantsearch-dom";
import Results from "../components/Results";
import SongGrid from "../components/SongGrid";

function IndexPage({ data }) {
  return (
    <Layout siteName="index">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Home" />
      {/* <div className="flex justify-center items-center mt-6 my-2 mx-4 lg:hidden">
          <CustomSearchBox />
        </div> */}
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-extrabold">
            Recent Additions
          </h1>
        </div>
        {/* <HitList /> */}
        <SongGrid songList={[...data.bsp.songs].reverse().slice(0, 10)} />
      </Results>
      <div className="flex justify-center mt-12">
        <Link
          className="border bg-emerald tracking-wide text-white px-4 py-2 rounded-full focus:outline-none"
          to="/all-songs"
        >
          Find a list of all songs here
        </Link>
      </div>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.object,
};

export default IndexPage;

export const query = graphql`
  query {
    bsp {
      songs {
        title
        slug
        song_description
        languages {
          language_name_en
          language_code
        }
        tags {
          tag_id
          tag_name
          tag_slug
        }
        contributors {
          contributor_id
          contributor_slug
          contributor_name
        }
        performances {
          content_url
        }
      }
      languages {
        language_name_en
        language_code
      }
      tags {
        tag_name
      }
    }
  }
`;
