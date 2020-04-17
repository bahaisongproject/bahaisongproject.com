import React from 'react';
import { Link } from "gatsby";

const SongCard = ({song}) => (
<Link to={song.slug}>
<div className="bg-orange-300 ml-0 mt-2 mb-2 mr-4 p-2 w-48 h-32 rounded-lg shadow-md">
    <div className="font-semibold">{song.title}</div>
    <div className="flex text-xs truncate">
    {song.contributors.map((contributor, i) => (
        <div key="0"><span>{i < 1 || ", "}</span><span>{contributor.contributor_name}</span></div>
    ))}
    </div>
</div>
</Link>

);

export default SongCard;