import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongCard from "../components/SongCard";
import Results from "../components/Results";

function TagTemplate({ data }) {
  const tag = data.bsp.tag;
  const tagSongList = tag.songs.sort((a, b) => (a.slug > b.slug ? 1 : -1));
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title={tag.tag_name}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h2 className="text-lg text-gray-700 uppercase font-bold">Tag</h2>
          <h1 className="text-3xl font-semibold">{tag.tag_name}</h1>
          <div>{tag.tag_description}</div>
          <div className="mt-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
            {(() => {
              if (tagSongList) {
                return tagSongList.map((song) => (
                  <SongCard key={song.slug} song={song} />
                ));
              }
            })()}
          </div>
        </div>
      </Results>
    </Layout>
  );
}

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
            contributor_slug
            contributor_name
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

export default TagTemplate;
