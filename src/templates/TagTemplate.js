import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Results from "../components/Results"
import DataTable from "react-data-table-component"
import { DocumentDownloadIcon } from "@heroicons/react/outline"
import { OutboundLink } from "gatsby-plugin-gtag"

const dateOptions = { year: "numeric", month: "long", day: "numeric" }

const columns = [
  {
    name: "Song",
    selector: "title",
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div className="py-2 gap-y-1 flex flex-col">
        <Link className="hover:underline font-bold" to={`/${row.slug}`}>
          {row.title}
        </Link>
        <div className="italic">{row.music}</div>
      </div>
    ),
  },
  {
    name: "Published",
    selector: "publishedAt",
    sortable: true,
    wrap: true,
    grow: 1,
    format: (row) =>
      new Date(row.publishedAt).toLocaleDateString("en-gb", dateOptions),
  },
  {
    name: "Song Sheet",
    sortable: false,
    center: true,
    width: "60px",
    cell: (row) => (
      <OutboundLink
        className="hover:underline"
        href={`https://www.bahaisongproject.com/${row.slug}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DocumentDownloadIcon className="w-6 h-6" aria-hidden="true" />
      </OutboundLink>
    ),
  },
]

function TagTemplate({ data, location }) {
  const tag = data.bsp.tag
  const tagSongList = tag.songs.sort((a, b) => (a.slug > b.slug ? 1 : -1))
  return (
    <Layout location={location}>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title={tag.tag_name}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h2 className="text-lg text-gray-700 uppercase font-bold">Tag</h2>
          <h1 className="text-3xl font-semibold">{tag.tag_name}</h1>
          <div>{tag.tag_description}</div>
          <div className="max-w-4xl mx-auto">
            {(() => {
              if (tagSongList) {
                return (
                  <DataTable noHeader columns={columns} data={tagSongList} />
                )
              }
            })()}
          </div>
        </div>
      </Results>
    </Layout>
  )
}

export const query = graphql`
  query($tagId: Int!) {
    bsp {
      tag(id: $tagId) {
        name
        description
        songs {
          title
          slug
          publishedAt
          music
          contributors {
            id
            slug
            name
          }
          languages {
            code
            nameEn
          }
          tags {
            id
            name
            slug
          }
          renditions {
            prio
            contentUrl
          }
        }
      }
    }
  }
`

export default TagTemplate
