import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SongCard from "./SongCard"

export default function SongShowcase({ songSlug }) {
  const songsQuery = graphql`
    query AllSongsQuery {
      allBspSong {
        nodes {
          title
          slug
          creditText
          contributorNames
          languageNames
          tagNames
          renditions {
            contentUrl
          }
        }
      }
    }
  `
  return (
    <StaticQuery
      query={songsQuery}
      render={(data) => (
        <div className="noprose">
          <SongCard
            song={data.allBspSong.nodes.find((song) => song.slug == songSlug)}
          />
        </div>
      )}
    />
  )
}
