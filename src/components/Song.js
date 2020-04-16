import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import ResponsiveEmbed from "react-responsive-embed";

function Song({ data }) {
  const song = data.bsp.song;
  //   const embedUrl = `https://www.youtube.com/embed/${song.mainPerformance.youtubeId}`
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={song.title}
      />
      <h1 className="text-lg font-semibold">{song.title}</h1>
      <div className="flex flex-wrap">
        {song.contributors.map((contributor) => (
          <div
            className="bg-red-400 tracking-wide text-xs text-gray-100  py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none"
            key="0"
          >
            {contributor.contributor_name}
          </div>
        ))}
      </div>
      <div>
        {song.performances.map((performance) => (
          <div key="0">
            {(() => {
              if (performance.youtube_id)
                return (
                  <ResponsiveEmbed
                    src={
                      "https://www.youtube.com/embed/" + performance.youtube_id
                    }
                    allowFullScreen
                  />
                );
              if (performance.soundcloud_id) {
                const url =
                  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" +
                  performance.soundcloud_id +
                  "&color=%238bb6af";
                return (
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={url}
                  ></iframe>
                );
              } else return null;
            })()}
          </div>
        ))}
      </div>
      <div className="no-bullet-list">
        <div className="flex flex-wrap">
          {song.excerpts.map((excerpt) => (
            <div key="0">
              <blockquote>
                {excerpt.excerpt_text}
                <br />— {excerpt.source.source_author} (
                {excerpt.source.source_description})
              </blockquote>
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
        contributors {
          contributor_name
        }
        performances {
          youtube_id
          soundcloud_id
        }
        excerpts {
          excerpt_text
          source {
            source_author
            source_description
          }
        }
      }
    }
  }
`;

export default Song;
