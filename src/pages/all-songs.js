import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongCard from "../components/SongCard";
import Results from "../components/Results";

function AllSongs({ data }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };
  const allSongList = data.bsp.songs.sort((a, b) => (a.slug > b.slug ? 1 : -1));
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="All Songs"
        image={image}
      />
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-extrabold">
            All Songs
          </h1>
        </div>

        {/* Song Grid */}
        <div className="mt-4 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            if (allSongList) {
              return allSongList.map((song) => (
                <SongCard key={song.slug} song={song} />
              ));
            }
          })()}
        </div>
      </Results>
    </Layout>
  );
}

export default AllSongs;

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
