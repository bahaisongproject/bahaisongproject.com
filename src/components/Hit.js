import React from "react";
import { Link } from "gatsby";
import SongCard from "./SongCard"


const Hit = ({ hit }) => (
    // <Link to={"/" + hit.slug}>{hit.title}</Link>
    <SongCard song={hit} key="0" />
);

export default Hit;
