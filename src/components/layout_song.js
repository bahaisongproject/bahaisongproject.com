import PropTypes from "prop-types";
import React from "react";

import Header from "./header";

function LayoutSong({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full max-w-4xl px-4 py-4 mx-auto md:px-8 md:py-8">
        {children}
      </main>

      <footer className="bg-teal-400">
        <nav className="flex justify-center max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white">&copy; bahá&apos;í song project</p>
        </nav>
      </footer>
    </div>
  );
}

LayoutSong.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutSong;
