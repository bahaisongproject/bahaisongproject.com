import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongGrid from "../components/SongGrid";

function AllSongs({ data }) {
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="All Songs" />
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h1 className="text-6xl font-extrabold">All Songs</h1>
      </div>
      <SongGrid
        songList={data.bsp.songs.sort((a, b) => (a.title > b.title ? 1 : -1))}
      />
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
          tag_name
        }
        contributors {
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
