import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import { PoweredBy } from "react-instantsearch-dom";
import Results from "../components/Results";
import SongGrid from "../components/SongGrid";
import SongCard from "../components/SongCard"
import SongShowcaseGrid from "../components/SongShowcaseGrid";
import SongShowcase from "../components/SongShowcase";

function IndexPage({ data }) {
  const featuredSongs = ["kuna-mtu", "kindle-the-fire-of-love", "kodi-palinso-wina", "dies-ist-der-tag", "gioisci"]
  return (
    <Layout siteName="index">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Home" />
      {/* <div className="flex justify-center items-center mt-6 my-2 mx-4 lg:hidden">
          <CustomSearchBox />
        </div> */}
      <Results>
      <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Featured
          </h1>
        </div>
        <SongGrid songList={[...data.bsp.songs].filter(song => featuredSongs.includes(song.slug) )} />
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Recent Additions
          </h1>
        </div>
        <SongGrid songList={[...data.bsp.songs].reverse().slice(0, 10)} />
      </Results>
      <div className="flex justify-center mt-12">
        <Link
          className="border bg-emerald tracking-wide text-white px-4 py-2 rounded-full focus:outline-none"
          to="/all-songs"
        >
          More songs
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
