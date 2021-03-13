import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongGrid from "../components/SongGrid";
import SongCard from "../components/SongCard";
import Results from "../components/Results";

function AllSongs({ data }) {
  const allSongList = data.bsp.songs.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="All Songs" />
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-extrabold">
            All Songs
          </h1>
        </div>
        <SongGrid className="mt-4 xs:mx-3 md:mx-4 lg:grid-cols-4 xl:grid-cols-5">
          {(() => {
            if (allSongList) {
              return allSongList.map((song) => (
                <SongCard key={song.slug} song={song} />
              ));
            }
          })()}
        </SongGrid>
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
