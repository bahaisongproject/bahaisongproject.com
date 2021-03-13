import { graphql } from "gatsby";
import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import PropTypes from "prop-types";
import SongGrid from "./SongGrid";
import SongCard from "./SongCard";
import Results from "./Results";

function TagPage({ data }) {
  const tag = data.bsp.tag;
  const tagSongList = tag.songs.sort((a, b) => (a.title > b.title ? 1 : -1));
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
          <SongGrid className="mt-4">
            {(() => {
              if (tagSongList) {
                return tagSongList.map((song) => (
                  <SongCard key={song.slug} song={song} />
                ));
              }
            })()}
          </SongGrid>
        </div>
      </Results>
    </Layout>
  );
}

TagPage.propTypes = {
  data: PropTypes.object,
};

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

export default TagPage;
