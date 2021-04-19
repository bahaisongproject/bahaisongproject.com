import { graphql, Link } from "gatsby";
import React, { Component } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/Button";
import ContentEmbedder from "../components/embedding/ContentEmbedder";
import ExcerptCard from "../components/ExcerptCard";
import Results from "../components/Results";
import { describe_song } from "../utils/description";

class SongTemplate extends Component {
  render() {
    const song = this.props.data.bsp.song;
    const description = describe_song(song);
    const image = {
      src: `/__social/${song.slug}.png`,
      width: 1200,
      height: 628,
    };
    return (
      <Layout>
        <SEO
          title={song.title}
          description={description}
          image={image}
          pathname={this.props.location.pathname}
        />
        <Results>
          <div className="max-w-4xl mx-auto px-4 mt-6">
            {/* Show languages and tags over song title */}
            <div className="flex flex-wrap">
              {/* Languages */}
              {song.languages.map((language) => (
                <div
                  className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
                  key="0"
                >
                  <Link to={"/language/" + language.language_code}>
                    {language.language_name_en}
                  </Link>
                </div>
              ))}

              {/* Tags */}
              {song.tags.map((tag) => (
                <div
                  className="border bg-gray-100 tracking-wide text-xs text-gray-600 px-1 mr-1 mt-2 rounded-sm focus:outline-none"
                  key="0"
                >
                  <Link to={"/tag/" + tag.tag_slug}>{tag.tag_name}</Link>
                </div>
              ))}
            </div>

            {/* Show contributors and / or song description */}
            <div className="flex flex-col mt-6 xs:items-end xs:flex-row xs:place-content-between">
              <div>
                <h1 className="text-3xl font-semibold font-sans leading-tight">
                  {song.title}
                </h1>

                {/* Contributors */}
                <div className="flex flex-wrap">
                  {song.contributors.map((contributor, i) => (
                    <div
                      className={
                        "contributor-name text-gray-700 leading-tight text-lg mt-1"
                      }
                      key="0"
                    >
                      <Link to={"/contributor/" + contributor.contributor_slug}>
                        {contributor.contributor_name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Song Description */}
                <div className="text-lg text-gray-700 leading-tight mt-1">
                  {song.song_description}
                </div>
              </div>

              {/* Song Sheet Download Button */}
              <Button
                url={"https://www.bahaisongproject.com/" + song.slug + ".pdf"}
              >
                Song Sheet
              </Button>
            </div>

            {/* Performances */}
            {song.performances
              .sort((a, b) =>
                a.performance_prio > b.performance_prio ? 1 : -1
              )
              .map((performance) => (
                <ContentEmbedder performance={performance} key="0" />
              ))}
            {song.excerpts.map((excerpt) => (
              <ExcerptCard excerpt={excerpt} song={song} key="0" />
            ))}
          </div>
        </Results>
      </Layout>
    );
  }
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

export default SongTemplate;
