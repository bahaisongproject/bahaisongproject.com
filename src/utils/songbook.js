const SONGBOOK_ORIGIN = "https://www.bahaisongs.com"

export function songbookSongUrl(slug) {
  return `${SONGBOOK_ORIGIN}/songs/${encodeURIComponent(slug)}`
}
