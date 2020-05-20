import PropTypes from "prop-types";
import React from "react";
import Header from "./header";

function Layout({ children, className }) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main
        className={
          "flex-1 w-full px-4 py-4 mx-auto md:px-8 md:py-8 " + className
        }
      >
        {children}
      </main>

      <footer className="bg-gray-600">
        <nav className="flex justify-center items-center max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="text-white">
            &copy; 2011 – {new Date().getFullYear()} bahá&apos;í song project
          </p>
          <a href="https://www.netlify.com">
            <img
              className="h-8 ml-4"
              src="https://www.netlify.com/img/global/badges/netlify-light.svg"
              alt="Deploys by Netlify"
            />
          </a>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
