import React from "react";
import { StaticQuery, graphql } from "gatsby";
import SongCard from "./SongCard";

export default function SongShowcase({ songSlug }) {
  const songsQuery = graphql`
    query AllSongsQuery {
      bsp {
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
  `;
  return (
    <StaticQuery
      query={songsQuery}
      render={(data) => (
        <div className="noprose">
          <SongCard
            song={data.bsp.songs.find((song) => song.slug == songSlug)}
          />
        </div>
      )}
    />
  );
}
