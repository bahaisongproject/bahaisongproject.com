import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PropTypes from "prop-types"
import Results from "../components/Results"
import SongCard from "../components/SongCard"

function IndexPage({ data, location }) {
  const allSongs = data.allBspListSong.nodes
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  }
  const featuredSongsSlugList = [
    "observe-all-the-things",
    "die-erde-ist-nur-ein-land",
    "god-is-sufficient-unto-me",
    "o-fils-de-lexistence",
    "ey-yalla",
  ]
  const featuredSongList = [...allSongs].filter((song) =>
    featuredSongsSlugList.includes(song.slug)
  )
  const recentSongList = [...allSongs]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 10)
  return (
    <Layout siteName="index" location={location}>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} image={image} />
      <Results>
        <div className="mt-10 mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Learn and listen to</span>{" "}
              <span className="block text-primary-600 xl:inline">
                Bahá&apos;í songs
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Find your favorite song, learn how to play with lyrics, chords and
              videos and sing with your community.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to={`/${
                    allSongs[Math.floor(Math.random() * allSongs.length)].slug
                  }`}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Random Song
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/collections"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                >
                  Curated Collections
                </Link>
              </div>
            </div>
            <div className="mt-8 max-w-xl sm:mx-auto lg:mx-0 text-left sm:text-center lg:text-left">
              <div>
                <h2 className="flex items-center justify-start sm:justify-center lg:justify-start space-x-2 text-base font-semibold text-gray-900">
                  <span>Try the new Songbook</span>
                  <span className="inline-flex items-center rounded-sm border border-primary-100 bg-primary-50 px-1.5 py-0.5 text-xs font-medium uppercase tracking-wide text-primary-700">
                    Experimental
                  </span>
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Find songs faster, transpose chords, and switch between
                  guitar and ukulele diagrams. Each song page includes lyrics
                  and chords, no PDF download required.
                </p>
              </div>
              <a
                href="https://songbook.bahaisongs.com"
                className="inline-flex mt-3 sm:mx-auto lg:mx-0 items-center justify-center px-3 py-1.5 border border-primary-200 text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
              >
                Open Songbook
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-4 mt-16 sm:mt-20 md:mt-48 mb-4">
          <h1 className="text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-green-400 to-primary-500">
            Featured
          </h1>
        </div>
        <div className="max-w-8xl mx-auto">
          <div className="mt-8 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <SongCard
              key={featuredSongList[0].slug}
              song={featuredSongList[0]}
            />
            <SongCard
              key={featuredSongList[1].slug}
              song={featuredSongList[1]}
            />
            <SongCard
              className="hidden md:block"
              key={featuredSongList[2].slug}
              song={featuredSongList[2]}
            />
            <SongCard
              className="hidden lg:block"
              key={featuredSongList[3].slug}
              song={featuredSongList[3]}
            />
            <SongCard
              className="hidden xl:block"
              key={featuredSongList[4].slug}
              song={featuredSongList[4]}
            />
          </div>
        </div>
        <div className="flex justify-center px-4 mt-24 mb-4">
          <h1 className="text-xl text-gray-900">Recent Additions</h1>
        </div>
        <div className="max-w-8xl mx-auto">
          <div className="mt-8 xs:mx-3 md:mx-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <SongCard className="" key={0} song={recentSongList[0]} />
            <SongCard className="" key={1} song={recentSongList[1]} />
            <SongCard className="" key={2} song={recentSongList[2]} />
            <SongCard
              className="hidden xs:block"
              key={3}
              song={recentSongList[3]}
            />
            <SongCard
              className="hidden md:block"
              key={4}
              song={recentSongList[4]}
            />
            <SongCard
              className="hidden md:block"
              key={5}
              song={recentSongList[5]}
            />
            <SongCard
              className="hidden lg:block"
              key={6}
              song={recentSongList[6]}
            />
            <SongCard
              className="hidden lg:block"
              key={7}
              song={recentSongList[7]}
            />
            <SongCard
              className="hidden xl:block"
              key={8}
              song={recentSongList[8]}
            />
            <SongCard
              className="hidden xl:block"
              key={9}
              song={recentSongList[9]}
            />
          </div>
        </div>
      </Results>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage

export const query = graphql`
  query {
    allBspListSong {
      nodes {
        publishedAt
        title
        slug
        description
        languages {
          nameEn
        }
        tags {
          name
        }
        contributors {
          name
        }
        renditions {
          contentUrl
        }
      }
    }
  }
`
