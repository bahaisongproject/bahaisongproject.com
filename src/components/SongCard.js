import React from "react"
import { Link } from "gatsby"
import Thumbnail from "./Thumbnail"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const SongCard = ({ song, className }) => (
  <div className={classNames("overflow-hidden", className)}>
    <Link to={`/` + song.slug}>
      <Thumbnail song={song} />
    </Link>
    <div className="pl-3 pr-1 py-2">
      <Link to={`/` + song.slug}>
        <div className="flex items-center">
          <div className=" text-xl font-medium leading-snug">{song.title}</div>
        </div>
      </Link>

      {/* Contributors */}
      <div className="flex flex-wrap">
        {[...song.contributorNames]
          .sort((a, b) => a.localeCompare(b))
          .map((contributorName, i) => (
            <div
              className={
                "contributor-name text-gray-700 leading-tight text-lg mt-1"
              }
              key={i}
            >
              {contributorName}
            </div>
          ))}
      </div>

      {/* Show song description if no contributors, if available */}
      {(() => {
        if (song.contributorNames.length === 0)
          return (
            <div className="text-gray-700 leading-tight">{song.creditText}</div>
          )
      })()}

      {/* Show languages and tags under song title */}
      <div className="flex flex-wrap">
        {/* Languages */}
        {song.languageNames.map((languageName, i) => (
          <div
            className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none"
            key={i}
          >
            {languageName}
          </div>
        ))}
        {/* Tags */}
        {song.tagNames.map((tagName, i) => (
          <div
            className="border border-primary-100 bg-primary-50 tracking-wide text-xs text-gray-500 px-1 mr-1 mt-2 rounded-md focus:outline-none"
            key={i}
          >
            {tagName}
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default SongCard
