import React from "react";
import ContentEmbedder from "./ContentEmbedder";

const PerformanceList = ({ song }) =>
  song.performances
    .sort((a, b) => (a.performance_prio > b.performance_prio ? 1 : -1))
    .map((performance) => (
      <ContentEmbedder performance={performance} key="0" />
    ));

export default PerformanceList;
