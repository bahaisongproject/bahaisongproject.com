import React from 'react';
import { Link } from "gatsby";

const SongCard = ({song}) => (
<Link to={song.slug}>
<div className="bg-orange-300 ml-0 mt-2 mb-2 mr-4 p-2 w-56 h-40 rounded-lg shadow-md">
    <div className="flex">
    {song.performances.length > 0 && song.performances.filter(p => p.youtube_id !== null).length > 0 ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4 fill-current mr-1">
                <path d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm6 0v12h8V4H6zM2 5v2h2V5H2zm0 4v2h2V9H2zm0 4v2h2v-2H2zm14-8v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zM8 7l5 3-5 3V7z"/>
        </svg>
    : null
    }
    {song.performances.length > 0 && song.performances.filter(p => p.soundcloud_id !== null).length > 0 ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4 w-4 fill-current mr-1">
            <path d="M20 2.5V0L6 2v12.17A3 3 0 0 0 5 14H3a3 3 0 0 0 0 6h2a3 3 0 0 0 3-3V5.71L18 4.3v7.88a3 3 0 0 0-1-.17h-2a3 3 0 0 0 0 6h2a3 3 0 0 0 3-3V2.5z"/>
        </svg>
    : null
    }
    </div>
    <div className="flex items-center font-semibold">
        <span className="truncate">{song.title}</span>
    </div>
    <div className="flex text-xs truncate">
    {song.contributors.map((contributor, i) => (
        <div key="0"><span>{i < 1 || ", "}</span><span>{contributor.contributor_name}</span></div>
    ))}
    </div>
    <div className="flex flex-wrap">
      {song.languages.map((language) => (
            <div className="bg-green-300 tracking-wide text-xs text-gray-900  py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none" key="0">
                <div>{language.language_code}</div>
            </div>
          ))}
    {song.tags.map((tag) => (
            <div className="bg-orange-400 tracking-wide text-xs text-gray-900 py-1 px-3 mr-1 mt-2 rounded-full focus:outline-none" key="0">
                <div>{tag.tag_name}</div>
            </div>
          ))}
    </div>
</div>
</Link>

);

export default SongCard;