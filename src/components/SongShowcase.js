import React from "react"
import { StaticQuery, graphql } from "gatsby"
import SongCard from "./SongCard"

export default function SongShowcase({ songSlug }) {
  const songsQuery = graphql`
    query AllSongsQuery {
      allBspListSong {
        nodes {
          title
          slug
          description
          languages {
            nameEn
          }
          tags {
            name
          }
          contributors {
            name
          }
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
            song={data.allBspListSong.nodes.find(
              (song) => song.slug == songSlug
            )}
          />
        </div>
      )}
    />
  )
}
