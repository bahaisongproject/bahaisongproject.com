import { graphql } from "gatsby";
import React, { Component } from 'react';
import Layout from "./layout";
import SEO from "./seo";
import PropTypes from "prop-types";
import LanguageList from "./LanguageList";
import TagList from "./TagList";
import ContributorList from "./ContributorList";
import DownloadButton from "./DownloadButton";
import PerformanceList from "./PerformanceList";
import ExcerptList from "./ExcerptList";
import SongDescription from "./SongDescription";
import Results from "./Results";
import {describe_song} from "../utils/description"

class Song extends Component {
  render() {
    const song = this.props.data.bsp.song;
    const description = describe_song(song)
    const image = {
      src: `/__social/${song.slug}.png`,
      width: 1200,
      height: 628
    }
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
            <div className="flex flex-wrap">
              <LanguageList song={song} />
              <TagList song={song} />
            </div>
            <div className="flex flex-col mt-6 xs:items-end xs:flex-row xs:place-content-between">
              <div>
                <h1 className="text-3xl font-semibold font-sans leading-tight">
                  {song.title}
                </h1>
                <ContributorList
                  className="text-gray-700 leading-tight text-lg mt-1"
                  song={song}
                />
                <SongDescription
                  className="text-gray-700 leading-tight text-lg mt-1"
                  song={song}
                />
              </div>
              <DownloadButton
                url={"https://www.bahaisongproject.com/" + song.slug + ".pdf"}
              >
                Song Sheet
              </DownloadButton>
            </div>
            <PerformanceList song={song} />
            <ExcerptList song={song} />
          </div>
        </Results>
      </Layout>
    );
  }
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

export default Song;
