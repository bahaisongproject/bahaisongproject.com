import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-bspgreen to-bspblue text-white flex justify-center flex-wrap items-baseline text-sm">
      <nav className="flex p-4">
        <ul className="flex">
          <li>
            <Link className="p-2" to="/legal">
              Legal
            </Link>
          </li>
          <li>
            <Link className="p-2" to="/privacy">
              Privacy
            </Link>
          </li>
          <li>
            <Link className="p-2" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="p-2" to="/subscribe">
              Subscribe
            </Link>
          </li>
          <li>
            <Link className="p-2" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center flex-wrap items-center p-4 text-sm">
        <p>&copy; 2011 – {new Date().getFullYear()} bahá&apos;í song project</p>
      </div>
    </footer>
  );
}

export default Footer;
