// eslint-disable-next-line import/no-unresolved
import { expect, test } from "bun:test"
import { songbookSongUrl } from "./songbook"

test("opens a song on the current Songbook detail route", () => {
  expect(songbookSongUrl("a-lover-feareth-nothing")).toBe(
    "https://www.bahaisongs.com/songs/a-lover-feareth-nothing"
  )
})

test("encodes a song slug as one route segment", () => {
  expect(songbookSongUrl("song/with spaces")).toBe(
    "https://www.bahaisongs.com/songs/song%2Fwith%20spaces"
  )
})
