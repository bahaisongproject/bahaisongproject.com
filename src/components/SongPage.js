import { graphql } from "gatsby";
import React from "react";
import Layout from "./layout";
import SEO from "./seo";
import PropTypes from "prop-types";
import LanguageList from "./LanguageList";
import TagList from "./TagList";
import ContributorList from "./ContributorList";
import DownloadButton from "./DownloadButton";
import PerformanceList from "./PerformanceList";
import ExcerptList from "./ExcerptList";
import SongDescription from "./SongDescription"
import PageResults from "./PageResults"

function Song({ data }) {
  const song = data.bsp.song;
  return (
    <Layout >
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={song.title} />
      <PageResults>
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap">
          <LanguageList song={song} />
          <TagList song={song} />
        </div>
        <h1 className="text-3xl font-semibold font-black font-serif">
          {song.title}
        </h1>
        <ContributorList className="text-gray-700 leading-tight" song={song} />
        <SongDescription className="text-gray-700" song={song} />
        <DownloadButton song={song} />
        <PerformanceList song={song} />
        <ExcerptList song={song} />
      </div>
    </PageResults>
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
