import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import LanguageList from "./LanguageList";
import TagList from "./TagList";
import ContributorList from "./ContributorList";
import DownloadButton from "./DownloadButton";
import PerformanceList from "./PerformanceList";
import ExcerptList from "./ExcerptList";
import SongDescription from "./SongDescription"

function Song({ data }) {
  const song = data.bsp.song;
  return (
    <Layout className="max-w-4xl mx-auto px-4 mt-6">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={song.title} />
      <div className="flex flex-wrap">
        <LanguageList song={song} />
        <TagList song={song} />
      </div>
      <h1 className="text-3xl font-semibold font-black font-serif">
        {song.title}
      </h1>
      <ContributorList song={song} />
      <SongDescription song={song} />
      <DownloadButton song={song} />
      <PerformanceList song={song} />
      <ExcerptList song={song} />
    </Layout>
  );
}

Song.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query($songSlug: String!) {
    bsp {
      song(where: { slug: $songSlug }) {
        title
        slug
        song_description
        contributors {
          contributor_name
        }
        performances {
          content_url
          performance_prio
        }
        excerpts {
          excerpt_text
          source {
            source_author
            source_description
          }
        }
        languages {
          language_name_en
        }
        tags {
          tag_name
        }
      }
    }
  }
`;

export default Song;
