import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import SongCard from "../components/SongCard";
import Results from "../components/Results";

function LanguageTemplate({ data }) {
  const language = data.bsp.language;
  const languageSongList = language.songs.sort((a, b) =>
    a.slug > b.slug ? 1 : -1
  );
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title={language.language_name_en}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h2 className="text-lg text-gray-700 uppercase font-bold">
            Language
          </h2>
          <h1 className="text-3xl font-semibold">
            {language.language_name_en}
          </h1>
          <div className="mt-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
            {(() => {
              if (languageSongList) {
                return languageSongList.map((song) => (
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
  query($languageId: Int!) {
    bsp {
      language(where: { language_id: $languageId }) {
        language_name_en
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

export default LanguageTemplate;
