import { graphql } from "gatsby"
import React, { Component } from "react"
import { OutboundLink } from "gatsby-plugin-gtag"
import { ExternalLinkIcon } from "@heroicons/react/solid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentEmbedder from "../components/embedding/ContentEmbedder"
import Results from "../components/Results"
import { describe_song } from "../utils/description"
import { songbookSongUrl } from "../utils/songbook"

class SongTemplate extends Component {
  render() {
    const { song } = this.props.data
    const description = describe_song(song)
    return (
      <Layout location={this.props.location}>
        <SEO
          title={song.title}
          description={description}
          pathname={this.props.location.pathname}
        />
        <Results>
          <div className="max-w-4xl mx-auto px-4 mt-6">
            {/* Show languages and tags over song title */}
            <div className="flex flex-wrap">
              {/* Languages */}
              {song.languageNames.map((languageName, i) => (
                <div
                  className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  key={i}
                >
                  {languageName}
                </div>
              ))}

              {/* Tags */}
              {song.tagNames.map((tagName, i) => (
                <div
                  className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  key={i}
                >
                  {tagName}
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
                  {[...song.contributorNames]
                    .sort((a, b) => a.localeCompare(b))
                    .map((contributorName, i) => (
                      <div
                        className={
                          "contributor-name leading-tight text-lg text-gray-500 sm:text-2xl md:text-3xl mt-1 sm:mt-4"
                        }
                        key={i}
                      >
                        {contributorName}
                      </div>
                    ))}
                </div>

                {/* Song Description */}
                <div className="leading-tight mt-1 text-lg text-gray-500 sm:text-2xl md:text-3xl">
                  {song.creditText}
                </div>
              </div>
            </div>

            {/* Renditions */}
            {song.renditions.map((rendition, i) => (
              <ContentEmbedder rendition={rendition} key={i} />
            ))}

            {/* Song sheet */}
            <div className="flex flex-col items-start space-y-6 mt-12 w-full">
              <div>
                <div className="flex flex-col xs:flex-row xs:items-center gap-3">
                  <OutboundLink
                    href={songbookSongUrl(song.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex space-x-1 items-center font-medium px-4 py-2 text-sm text-left text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  >
                    <span>Open in Songbook</span>
                    <ExternalLinkIcon className="w-4 h-4 text-primary-100" />
                  </OutboundLink>
                  <OutboundLink
                    href={
                      "https://www.bahaisongproject.com/" + song.slug + ".pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex space-x-1 items-center font-medium px-4 py-2 text-sm text-left text-gray-700 bg-primary-100 rounded-lg hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  >
                    <span>Download PDF</span>
                    <ExternalLinkIcon className="w-4 h-4 text-gray-600" />
                  </OutboundLink>
                </div>
              </div>
              <p className="text-sm text-left text-gray-500">
                Something missing or incorrect?{" "}
                <OutboundLink
                  href={
                    "https://portal.bahaisongs.com/submissions/update/" +
                    song.slug
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline hover:text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                >
                  Improve this song
                </OutboundLink>
                .
              </p>
            </div>
          </div>
        </Results>
      </Layout>
    )
  }
}

export default SongTemplate

export const query = graphql`
  query SongPage($songId: String!) {
    song: bspSong(songId: { eq: $songId }) {
      songId
      slug
      title
      publishedAt
      creditText
      creditLine
      contributorNames
      languageNames
      tagNames
      renditions {
        provider
        contentUrl
        videoId
      }
    }
  }
`
