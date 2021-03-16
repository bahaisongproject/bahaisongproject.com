import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { is_youtube, get_youtube_id } from "../utils/embed";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
  `;

  return (
    <StaticQuery
      query={query}
      render={(data) => (
          (() => {
            if (
              song.performances.length > 0 &&
              song.performances.filter((p) => is_youtube(p.content_url))
                .length > 0
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
              const thumbnail_image = getImage(
                data.allFile.nodes.find(
                  (thumbnail) => thumbnail.name == song.slug
                )
              );
              return (
                // <img src={thumbnail_url} className="absolute top-0 left-0 h-full w-full object-cover xs:rounded-sm" />
                <GatsbyImage
                  className="xs:rounded-sm bg-gradient-to-r from-bspgreen to-bspblue"
                  image={thumbnail_image}
                  alt=""
                />
              );
            } else {
                return (
                    <div className="pt-9/16 bg-gradient-to-r from-bspgreen to-bspblue" />
                )
            }
          })()
      )}
    />
  );
}
