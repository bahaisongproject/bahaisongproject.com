import { isYouTube } from "./embed.mjs"

export function describeSong(song) {
  if ((song.renditions || []).some((rendition) => isYouTube(rendition.contentUrl))) {
    return `Get lyrics and chords for ${song.title} and learn how to play with a video`
  }

  return `Get lyrics and chords for ${song.title}`
}
