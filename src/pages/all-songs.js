import React, { Fragment, useState } from "react"
import { graphql, Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-gtag"

import { DocumentDownloadIcon } from "@heroicons/react/outline"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Results from "../components/Results"
import DataTable from "react-data-table-component"

const dateOptions = { year: "numeric", month: "long", day: "numeric" }

const TitleCell = ({ row }) => (
  <div className="py-2 flex flex-col sm:text-base md:text-lg">
    <Link className="hover:underline font-bold" to={`/${row.slug}`}>
      {row.title}
    </Link>
    <div className="text-gray-700">{row.music}</div>
  </div>
)

const PublishedCell = ({ row }) => (
  <div className="py-2 sm:text-base md:text-lg">
    {new Date(row.publishedAt).toLocaleDateString("en-gb", dateOptions)}
  </div>
)

const SongSheetCell = ({ row }) => (
  <OutboundLink
    className="hover:underline"
    href={`https://www.bahaisongproject.com/${row.slug}.pdf`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <DocumentDownloadIcon className="w-6 h-6" aria-hidden="true" />
  </OutboundLink>
)

const columns = [
  {
    name: "Song",
    selector: "title",
    sortable: true,
    grow: 2,
    cell: function titleCell(row) {
      return <TitleCell row={row} />
    },
  },
  {
    name: "Published",
    selector: "publishedAt",
    sortable: true,
    wrap: true,
    grow: 1,
    cell: function publishedCell(row) {
      return <PublishedCell row={row} />
    },
  },
  {
    name: "Song Sheet",
    sortable: false,
    center: true,
    width: "60px",
    cell: function songSheetCell(row) {
      return <SongSheetCell row={row} />
    },
  },
]

function AllSongs({ data, location }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  }
  const allSongList = data.bsp.allSongs.sort((a, b) =>
    a.slug > b.slug ? 1 : -1
  )
  return (
    <Layout location={location}>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="All Songs"
        image={image}
      />
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-medium">
            All Songs
          </h1>
        </div>

        {/* Song list */}
        <div className="max-w-4xl mx-auto">
          <DataTable
            noHeader
            columns={columns}
            data={allSongList}
            pagination
            paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
            paginationPerPage={100}
          />
        </div>
      </Results>
    </Layout>
  )
}

export default AllSongs

export const query = graphql`
  query {
    bsp {
      allSongs {
        publishedAt
        title
        music
        words
        slug
        description
        languages {
          nameEn
          code
        }
        tags {
          id
          name
          slug
        }
        contributors {
          id
          slug
          name
        }
        renditions {
          contentUrl
        }
      }
      allLanguages {
        nameEn
        code
      }
      allTags {
        name
      }
    }
  }
`
