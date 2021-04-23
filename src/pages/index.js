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
              Discover, learn and listen to Bahá&apos;í songs
            </h1>
            <p>
              Find your (new) favorite song. Learn how to play with lyrics,
              chords and videos. Sing with your community.
            </p>
          </div>
        </div>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-4xl text-gray-900 font-medium text-gradient bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-500">
            Featured
          </h1>
        </div>
        <div className="mt-8 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <SongCard key={featuredSongList[0].slug} song={featuredSongList[0]} />
          <SongCard key={featuredSongList[1].slug} song={featuredSongList[1]} />
          <SongCard
            className="hidden md:block"
            key={featuredSongList[2].slug}
            song={featuredSongList[2]}
          />
          <SongCard
            className="hidden lg:block"
            key={featuredSongList[3].slug}
            song={featuredSongList[3]}
          />
          <SongCard
            className="hidden xl:block"
            key={featuredSongList[4].slug}
            song={featuredSongList[4]}
          />
        </div>
        <div className="flex justify-center px-4 mt-24 mb-4">
          <h1 className="text-4xl text-gray-900 font-medium">
            Recent Additions
          </h1>
        </div>
        <div className="mt-8 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <SongCard className="" key={0} song={recentSongList[0]} />
          <SongCard className="" key={1} song={recentSongList[1]} />
          <SongCard className="" key={2} song={recentSongList[2]} />
          <SongCard
            className="hidden xs:block"
            key={3}
            song={recentSongList[3]}
          />
          <SongCard
            className="hidden md:block"
            key={4}
            song={recentSongList[4]}
          />
          <SongCard
            className="hidden md:block"
            key={5}
            song={recentSongList[5]}
          />
          <SongCard
            className="hidden lg:block"
            key={6}
            song={recentSongList[6]}
          />
          <SongCard
            className="hidden lg:block"
            key={7}
            song={recentSongList[7]}
          />
          <SongCard
            className="hidden xl:block"
            key={8}
            song={recentSongList[8]}
          />
          <SongCard
            className="hidden xl:block"
            key={9}
            song={recentSongList[9]}
          />
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
