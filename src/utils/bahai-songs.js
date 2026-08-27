const BAHAI_SONGS_ORIGIN = "https://www.bahaisongs.com"

export function bahaiSongsSongUrl(slug) {
  return `${BAHAI_SONGS_ORIGIN}/songs/${encodeURIComponent(slug)}`
}
