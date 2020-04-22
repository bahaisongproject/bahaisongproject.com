import { graphql } from "gatsby";
import React from "react";
import LayoutSong from "../components/layout_song";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import ResponsiveEmbed from "react-responsive-embed";

function Song({ data }) {
  const song = data.bsp.song;
  //   const embedUrl = `https://www.youtube.com/embed/${song.mainPerformance.youtubeId}`
  return (
    <LayoutSong>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title={song.title}
      />
      <div className="flex flex-wrap">
      {song.languages.map((language) => (
            <div className="bg-green-300 tracking-wide text-xs text-gray-900  py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none" key="0">
                <div>{language.language_name_en}</div>
            </div>
          ))}
      {song.tags.map((tag) => (
            <div className="bg-orange-400 tracking-wide text-xs text-gray-900 py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none" key="0">
                <div>{tag.tag_name}</div>
            </div>
          ))}
      </div>
      <h1 className="text-3xl font-semibold font-black">{song.title}</h1>
      <div className="flex flex-wrap">
        {song.contributors.map((contributor, i) => (
            <div
                className="font-thin"
                key="0"
            >
                <span>{i < 1 || ", "}</span>{contributor.contributor_name}
            </div>
        ))}
      </div>
      <a href={"https://pdf.bahaisongproject.com/" + song.slug + ".pdf"} target="_blank" rel="noopener noreferrer">
        <button className="bg-blue-800 text-white py-2 px-4 mt-4 rounded-full inline-block focus:outline-none">
          Download PDF
        </button>
      </a>
      <div>
        {song.performances.map((performance) => (
          <div className="mt-8" key="0">
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
      <div>
        <div>
          {song.excerpts.map((excerpt) => (
            <div className="border-l-4 border-blue-800 px-4 p-4 my-4 bg-pink-200 text-gray-900" key="0">
              <blockquote>
                <div>{excerpt.excerpt_text}</div>
              </blockquote>
              <div className="text-sm mt-2 flex flex-wrap justify-between">
                <div className=" uppercase">{excerpt.source.source_author}</div>
                <div>{excerpt.source.source_description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutSong>
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
