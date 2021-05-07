import { graphql, Link } from "gatsby";
import React, { Component } from "react";
import { OutboundLink } from "gatsby-plugin-gtag";
import ChordSheetJS from "chordsheetjs";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/Button";
import ContentEmbedder from "../components/embedding/ContentEmbedder";
import ExcerptCard from "../components/ExcerptCard";
import Results from "../components/Results";
import { describe_song } from "../utils/description";

const parser = new ChordSheetJS.ChordProParser();
const songSheetFormatter = new ChordSheetJS.TextFormatter();

function preProcessChordSheet(songSheetString) {
  return songSheetString
    .replace(/^({[^c]).*$/gm, "") // Remove all directives but the c (comment) directive
    .replace(/^\s+|\s+$/g, "") // Remove newlines at start
    .replace(/(\d)\\(\d)/g, "$1\\\\$2"); // Escape backslash in tabs
}

function createSongSheetMarkup(songSheetString) {
  const preprocessedChordSheet = preProcessChordSheet(songSheetString);
  const parsedSongSheet = parser.parse(preprocessedChordSheet);
  const formattedSongSheet = songSheetFormatter.format(parsedSongSheet);
  return { __html: formattedSongSheet };
}

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
              {song.languages.map((language, i) => (
                <div
                  className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  key={i}
                >
                  <Link to={"/language/" + language.language_code}>
                    {language.language_name_en}
                  </Link>
                </div>
              ))}

              {/* Tags */}
              {song.tags.map((tag, i) => (
                <div
                  className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  key={i}
                >
                  <Link to={"/tag/" + tag.tag_slug}>{tag.tag_name}</Link>
                </div>
              ))}
            </div>

            {/* Show contributors and / or song description */}
            <div className="flex flex-col mt-6 xs:items-end xs:flex-row xs:place-content-between">
              <div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  {song.title}
                </h1>

                {/* Contributors */}
                <div className="flex flex-wrap">
                  {song.contributors.map((contributor, i) => (
                    <div
                      className={
                        "contributor-name leading-tight text-lg text-gray-500 sm:text-2xl md:text-3xl mt-1 sm:mt-4"
                      }
                      key={i}
                    >
                      <Link to={"/contributor/" + contributor.contributor_slug}>
                        {contributor.contributor_name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Song Description */}
                <div className="leading-tight mt-1 text-lg text-gray-500 sm:text-2xl md:text-3xl">
                  {song.song_description}
                </div>
              </div>
            </div>

            {/* Performances */}
            {song.performances
              .sort((a, b) =>
                a.performance_prio > b.performance_prio ? 1 : -1
              )
              .map((performance, i) => (
                <ContentEmbedder performance={performance} key={i} />
              ))}

            {/* Song sheet */}
            <div className="flex flex-col items-start space-y-6 mt-12">
              {/* Song Sheet Download Button */}
              <OutboundLink
                href={"https://www.bahaisongproject.com/" + song.slug + ".pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex space-x-1 items-center font-medium px-4 py-2 text-sm text-left text-gray-700 bg-primary-100 rounded-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
              >
                <span>Download Song Sheet</span>
                <ExternalLinkIcon className="w-4 h-4 text-gray-600" />
              </OutboundLink>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex space-x-1 px-4 py-2 text-sm font-medium text-left text-gray-700 bg-primary-100 rounded-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                      <span>View Song Sheet</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-600`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel
                        static
                        className="px-4 pt-4 pb-2 text-gray-900 "
                      >
                        <div
                          className="-mr-4 font-mono whitespace-pre overflow-x-auto"
                          dangerouslySetInnerHTML={createSongSheetMarkup(
                            song.song_sheet
                          )}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>

            {/* Excerpts */}
            {song.excerpts.map((excerpt, i) => (
              <ExcerptCard excerpt={excerpt} song={song} key={i} />
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
        song_sheet
        contributors {
          contributor_name
          contributor_slug
        }
        performances {
          content_url
          performance_prio
        }
        excerpts {
          excerpt_id
          excerpt_text
          language {
            language_name_en
          }
          source {
            source_author
            source_description
            excerpts {
              excerpt_id
              excerpt_text
              language {
                language_name_en
              }
              source {
                source_author
                source_description
              }
              songs {
                song_id
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
