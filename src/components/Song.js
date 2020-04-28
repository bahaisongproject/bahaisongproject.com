import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import ContentEmbedder from "../components/ContentEmbedder";

function Song({ data }) {
  const song = data.bsp.song;
  return (
    <Layout className="max-w-4xl">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title={song.title} />
      <div className="flex flex-wrap">
        {song.languages.map((language) => (
          <div
            className="border-2 border-blue-700 tracking-wide text-xs text-blue-800  py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none"
            key="0"
          >
            <div>{language.language_name_en}</div>
          </div>
        ))}
        {song.tags.map((tag) => (
          <div
            className="border-2 border-gray-600 tracking-wide text-xs text-gray-800 py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none"
            key="0"
          >
            <div>{tag.tag_name}</div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold font-black">{song.title}</h1>
      <div className="flex flex-wrap">
        {song.contributors.map((contributor, i) => (
          <div className="font-thin" key="0">
            <span>{i < 1 || ", "}</span>
            {contributor.contributor_name}
          </div>
        ))}
      </div>
      <a
        href={"https://pdf.bahaisongproject.com/" + song.slug + ".pdf"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="text-gray-100 bg-blue-700 py-2 px-4 mt-4 rounded-full inline-block focus:outline-none">
          Download PDF
        </button>
      </a>
      <div>
        {song.performances.map((performance) => (
          <ContentEmbedder performance={performance} key="0" />
        ))}
      </div>
      <div>
        <div>
          {song.excerpts.map((excerpt) => (
            <div
              className="border-l-4 max-w-xl border-blue-800 px-4 p-4 my-4 bg-blue-100 transparent text-gray-900"
              key="0"
            >
              {(() => {
                let excerpt_text = excerpt.excerpt_text
                  .split("  ")
                  .map((paragraph, i) => {
                    return <p key={i}>{paragraph}</p>;
                  });
                return (
                  <blockquote>
                    <div>{excerpt_text}</div>
                  </blockquote>
                );
              })()}
              <div className="text-sm mt-2 flex flex-wrap justify-between">
                <div className=" uppercase">{excerpt.source.source_author}</div>
                <div>{excerpt.source.source_description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
        contributors {
          contributor_name
        }
        performances {
          youtube_id
          soundcloud_id
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
