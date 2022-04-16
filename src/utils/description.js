import { is_youtube } from "./embed";

function has_video(song){
    if (
        song.renditions.length > 0 &&
        song.renditions.filter((p) => is_youtube(p.contentUrl)).length > 0
      ) {
          return true
      } else {
          return false
      }
}

function describe_song(song) {
    var description = ""
    if (has_video(song)) {
        description = `Get lyrics and chords for ${song.title} and learn how play with a video`
    } else {
        description = `Get lyrics and chords for ${song.title}`
    }
    return description
}
  
  
export { describe_song };
  