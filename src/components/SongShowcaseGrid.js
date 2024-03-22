import React from "react"

const SongShowcaseGrid = ({ children }) => (
  <div className="mt-16 mb-16 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
    {children}
  </div>
)

export default SongShowcaseGrid
