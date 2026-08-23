import React from "react"
import YouTubeEmbedder from "./YouTubeEmbedder"
import SoundCloudEmbedder from "./SoundCloudEmbedder"
import BandcampEmbedder from "./BandcampEmbedder"

const ContentEmbedder = ({ rendition }) => (
  <div className="mt-8">
    {(() => {
      if (rendition.provider === "youtube")
        return <YouTubeEmbedder rendition={rendition} />
      if (rendition.provider === "soundcloud") {
        return <SoundCloudEmbedder rendition={rendition} />
      }
      if (rendition.provider === "bandcamp") {
        return <BandcampEmbedder rendition={rendition} />
      } else return null
    })()}
  </div>
)

export default ContentEmbedder
