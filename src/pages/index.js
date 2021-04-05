import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import Results from "../components/Results";
import SongGrid from "../components/SongGrid";
import SongCard from "../components/SongCard";

function IndexPage({ data }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628
  }
  const featuredSongsSlugList = [
    "kuna-mtu",
    "remember-at-all-times",
    "kodi-palinso-wina",
    "dies-ist-der-tag",
    "gioisci",
  ];
  const featuredSongList = [...data.bsp.songs].filter((song) =>
    featuredSongsSlugList.includes(song.slug)
  );
  const recentSongList = [...data.bsp.songs].reverse().slice(0, 10);
  return (
    <Layout siteName="index">
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        image={image} />
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Featured
          </h1>
        </div>
        <SongGrid className="mt-4 xs:mx-3 md:mx-4 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            return featuredSongList.map((song) => (
              <SongCard key={song.slug} song={song} />
            ));
          })()}
        </SongGrid>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Recent Additions
          </h1>
        </div>
        <SongGrid className="mt-4 xs:mx-3 md:mx-4 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            if (recentSongList) {
              return recentSongList.map((song) => (
                <SongCard key={song.slug} song={song} />
              ));
            }
          })()}
        </SongGrid>
      </Results>
      <div className="flex justify-center mt-12">
        <Link
          className="border bg-gradient-to-r from-bspgreen to-bspblue tracking-wide text-white px-4 py-2 rounded-full focus:outline-none"
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
