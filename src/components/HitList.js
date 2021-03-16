import React from "react";
import { connectHits } from "react-instantsearch-dom";
import SongGrid from "./SongGrid";
import SongCard from "./SongCard";

const HitListTmp = ({ hits }) => {
    return (
        <SongGrid className="mt-4 xs:mx-3 md:mx-4 lg:grid-cols-4 xl:grid-cols-5">
            {(() => {
            if (hits) {
                return hits.map((song) => (
                <SongCard key={song.slug} song={song} />
                ));
            }
            })()}
        </SongGrid>
    )
}

const HitList = connectHits(HitListTmp);

export default HitList;
