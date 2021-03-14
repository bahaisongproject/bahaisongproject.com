import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { is_youtube, get_youtube_id } from "../utils/embed";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function Thumbnail({ song }) {
  const query = graphql`
  query ThumbnailQuery {
  allFile {
    nodes {
      name
      childImageSharp {
        gatsbyImageData
      }
    }
  }
}
  `

  return (
    <StaticQuery
    query={query}
    render={(data) => (
        <div className="bg-green-blue relative pt-14/25 bg-gray-200 xs:rounded-sm">
        {(() => {
          if (
            song.performances.length > 0 &&
            song.performances.filter((p) => is_youtube(p.content_url)).length > 0
          ) {
            const yt_performance = song.performances
              .filter((p) => is_youtube(p.content_url))
              .sort((a, b) =>
                a.performance_prio > b.performance_prio ? 1 : -1
              )[0];
            const thumbnail_url =
              "https://www.bahaisongproject.com/ytimage/" +
              get_youtube_id(yt_performance.content_url) +
              "/hqdefault.jpg";
            const thumbnail_image = getImage(data.allFile.nodes.find((thumbnail) => thumbnail.name == song.slug))
            return (
              <GatsbyImage className="absolute top-0 left-0 h-full w-full object-cover xs:rounded-sm" image={thumbnail_image} alt="" />
            );
          }
        })()}
      </div>  
    )}
  />
  )
}