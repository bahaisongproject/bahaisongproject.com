import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SongCard from "./SongCard";

export default function SongShowcase({ songSlug }) {
  const songsQuery = graphql`
    query AllSongsQuery {
      bsp {
        allSongs {
          title
          slug
          description
          languages {
            nameEn
            code
          }
          tags {
            id
            name
            slug
          }
          contributors {
            id
            slug
            name
          }
          renditions {
            contentUrl
          }
        }
      }
    }
  `;
  return (
    <StaticQuery
      query={songsQuery}
      render={(data) => (
        <div className="noprose">
          <SongCard
            song={data.bsp.allSongs.find((song) => song.slug == songSlug)}
          />
        </div>
      )}
    />
  );
}
