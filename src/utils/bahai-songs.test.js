// eslint-disable-next-line import/no-unresolved
import { expect, test } from "bun:test"
import { bahaiSongsSongUrl } from "./bahai-songs"

test("opens a song on the Bahá’í Songs detail route", () => {
  expect(bahaiSongsSongUrl("a-lover-feareth-nothing")).toBe(
    "https://www.bahaisongs.com/songs/a-lover-feareth-nothing"
  )
})

test("encodes a song slug as one route segment", () => {
  expect(bahaiSongsSongUrl("song/with spaces")).toBe(
    "https://www.bahaisongs.com/songs/song%2Fwith%20spaces"
  )
})
