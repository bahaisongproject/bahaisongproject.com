import { graphql, Link } from "gatsby"
import React, { Component } from "react"
import { OutboundLink } from "gatsby-plugin-gtag"
import { ExternalLinkIcon } from "@heroicons/react/solid"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentEmbedder from "../components/embedding/ContentEmbedder"
import ExcerptCard from "../components/ExcerptCard"
import Results from "../components/Results"
import { describe_song } from "../utils/description"

class SongTemplate extends Component {
  render() {
    const { song } = this.props.pageContext // Get song data from page context
    const description = describe_song(song)
    const image = {
      src: `/__social/${song.slug}.png`,
      width: 1200,
      height: 628,
    }
    return (
      <Layout location={this.props.location}>
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
                  {language.nameEn}
                </div>
              ))}

              {/* Tags */}
              {song.tags.map((tag, i) => (
                <div
                  className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                  key={i}
                >
                  {tag.name}
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
                  {song.contributors
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((contributor, i) => (
                      <div
                        className={
                          "contributor-name leading-tight text-lg text-gray-500 sm:text-2xl md:text-3xl mt-1 sm:mt-4"
                        }
                        key={i}
                      >
                        {contributor.name}
                      </div>
                  ))}
                </div>

                {/* Song Description */}
                <div className="leading-tight mt-1 text-lg text-gray-500 sm:text-2xl md:text-3xl">
                  {song.description}
                </div>
              </div>
            </div>

            {/* Renditions */}
            {song.renditions
              .sort((a, b) => (a.prio > b.prio ? 1 : -1))
              .map((rendition, i) => (
                <ContentEmbedder rendition={rendition} key={i} />
              ))}

            {/* Song sheet */}
            <div className="flex flex-col items-start space-y-6 mt-12 w-full">
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
            </div>

            {/* Excerpts */}
            {song.excerpts.map((excerpt, i) => (
              <ExcerptCard excerpt={excerpt} song={song} key={i} />
            ))}
          </div>
        </Results>
      </Layout>
    )
  }
}

export default SongTemplate
