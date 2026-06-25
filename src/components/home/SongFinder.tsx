import * as React from "react"
import { ArrowDownAZ, CalendarDays, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import SongResultsList, {
  names,
  type SongResult,
} from "@/components/home/SongResultsList"
import { Input } from "@/components/ui/input"

export type FinderSong = SongResult

type SortMode = "title" | "newest"

const PAGE_SIZE = 25

function searchableText(song: FinderSong) {
  return [
    song.title,
    song.slug,
    song.description,
    song.music,
    song.words,
    names(song.contributors),
    names(song.languages, "nameEn"),
    names(song.tags),
    (song.tags || []).map((tag) => tag.description).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

function sortSongs(songs: FinderSong[], sortMode: SortMode) {
  const sorted = [...songs]
  if (sortMode === "newest") {
    sorted.sort((a, b) =>
      String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")),
    )
    return sorted
  }

  sorted.sort((a, b) => a.title.localeCompare(b.title))
  return sorted
}

export default function SongFinder({ songs }: { songs: FinderSong[] }) {
  const [query, setQuery] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [sortMode, setSortMode] = React.useState<SortMode>("title")
  const normalizedQuery = query.trim().toLowerCase()

  const filteredSongs = React.useMemo(() => {
    const base = normalizedQuery
      ? songs.filter((song) => searchableText(song).includes(normalizedQuery))
      : songs

    return sortSongs(base, sortMode)
  }, [normalizedQuery, songs, sortMode])

  React.useEffect(() => {
    setPage(1)
  }, [normalizedQuery, sortMode])

  const pageCount = Math.max(1, Math.ceil(filteredSongs.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visibleSongs = filteredSongs.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  return (
    <section
      id="songs"
      className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="song-finder-title"
    >
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="song-finder-title"
            className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
          >
            Find a song
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
            Search by title, contributor, language, tag, words, music, or
            description.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>{filteredSongs.length} songs</span>
        </div>
      </div>

      <SongResultsList
        songs={visibleSongs}
        controls={
          <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for songs"
                className="pl-9"
                aria-label="Search songs"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={sortMode === "title" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortMode("title")}
              >
                <ArrowDownAZ aria-hidden="true" />
                Title
              </Button>
              <Button
                type="button"
                variant={sortMode === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortMode("newest")}
              >
                <CalendarDays aria-hidden="true" />
                Newest
              </Button>
            </div>
          </div>
        }
        empty={
          <div className="p-8 text-center">
            <h3 className="text-base font-medium text-slate-950">
              No songs found
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Try a title, contributor, language, or theme.
            </p>
          </div>
        }
        footer={
          <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Page {safePage} of {pageCount}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage === 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={safePage === pageCount}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        }
      />
    </section>
  )
}
