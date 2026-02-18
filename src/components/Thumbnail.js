import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { is_youtube } from "../utils/embed"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Thumbnail({ song }) {
  const query = graphql`
    query ThumbnailQuery {
      allFile(filter: { extension: { eq: "jpg" } }) {
        nodes {
          name
          extension
          childImageSharp {
            gatsbyImageData(
              placeholder: NONE
              width: 480
              height: 270
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `

  return (
    <StaticQuery
      query={query}
      render={(data) =>
        (() => {
          if (
            song.renditions.length > 0 &&
            song.renditions.filter((p) => is_youtube(p.contentUrl)).length > 0
          ) {
            const thumbnailNode = data.allFile.nodes.find(
              (thumbnail) => thumbnail.name == song.slug
            )
            const thumbnail_image = thumbnailNode
              ? getImage(thumbnailNode)
              : null
            if (!thumbnail_image) {
              return (
                <div className="pt-9/16 bg-gradient-to-r from-gray-300 to-gray-400" />
              )
            }
            return (
              <GatsbyImage
                className="xs:rounded-sm bg-gradient-to-r from-gray-300 to-gray-400"
                image={thumbnail_image}
                alt=""
              />
            )
          } else {
            return (
              <div className="pt-9/16 bg-gradient-to-r from-gray-300 to-gray-400" />
            )
          }
        })()
      }
    />
  )
}
