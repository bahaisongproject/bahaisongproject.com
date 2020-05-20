import React from "react";
import { connectHits } from 'react-instantsearch-dom';
import Hit from "./Hit";

const Hits = ({ hits }) => (
  <div className="flex flex-wrap">
    {hits.map(hit => (
        <Hit hit={hit} key={hit.objectID}/>
    ))}
  </div>
);

const CustomHits = connectHits(Hits);

export default CustomHits;
