import React from "react"
import { Link } from "gatsby"

import { connectHits } from "react-instantsearch-dom"
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

const HitListTmp = ({ hits }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {(() => {
        if (hits) {
          return <DataTable noHeader columns={columns} data={hits} />
        }
      })()}
    </div>
  )
}

const HitList = connectHits(HitListTmp)

export default HitList
