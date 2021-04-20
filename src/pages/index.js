import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import Results from "../components/Results";
import SongCard from "../components/SongCard";

function IndexPage({ data }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };
  const featuredSongsSlugList = [
    "say",
    "remember-at-all-times",
    "armed",
    "heri-pahali",
    "apple-of-mine-eye",
  ];
  const featuredSongList = [...data.bsp.songs].filter((song) =>
    featuredSongsSlugList.includes(song.slug)
  );
  const recentSongList = [...data.bsp.songs].reverse().slice(0, 10);
  return (
    <Layout siteName="index">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} image={image} />
      <Results>
        <div className="container px-5 py-24 mx-auto">
          <div className="mt-12 flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1 uppercase">
              Lyrics, Chords, Videos
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900 capitalize">
              Discover and learn Bahá&apos;í songs.
            </h1>
          </div>
        </div>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Featured
          </h1>
        </div>
        <div className="mt-4 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            return featuredSongList.map((song) => (
              <SongCard key={song.slug} song={song} />
            ));
          })()}
        </div>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-normal">
            Recent Additions
          </h1>
        </div>
        <div className="mt-4 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            if (recentSongList) {
              return recentSongList.map((song) => (
                <SongCard key={song.slug} song={song} />
              ));
            }
          })()}
        </div>
      </Results>
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
