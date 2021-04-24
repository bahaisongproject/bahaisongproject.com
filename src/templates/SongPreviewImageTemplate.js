import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export default function SongPreviewImageTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const song = data.bsp.song;
  return (
    <div
      className="block prose prose-2xl"
      style={{
        maxWidth: "1200px",
        maxHeight: "628px",
        height: "628px",
        width: "1200px",
      }}
    >
      <div className="p-24 flex flex-col h-full">
        <div className="flex flex-grow items-end text-7xl">
          <div className="p-8 w-full font-black text-8xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500">
            {song.title}
          </div>
        </div>
        <div className="mx-auto mt-8">
          {/* <div className="text-6xl font-black">bahaisongproject.com</div> */}
          <StaticImage
            src="../images/logo_500x500.png"
            height={100}
            width={100}
            alt="bsp logo"
          />
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query($songSlug: String!) {
    bsp {
      song(where: { slug: $songSlug }) {
        title
        slug
        song_description
        contributors {
          contributor_name
          contributor_slug
        }
        performances {
          content_url
          performance_prio
        }
        excerpts {
          excerpt_text
          language {
            language_name_en
          }
          source {
            source_author
            source_description
            excerpts {
              excerpt_text
              language {
                language_name_en
              }
              source {
                source_author
                source_description
              }
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
            }
          }
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
      }
    }
  }
`;
