import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Results from "../components/Results";

function Subscribe() {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="Subscribe"
        image={image}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6 mb-2">
          <h1 className="mb-8 text-5xl text-gray-900 leading-tight font-extrabold">
            Subscribe
          </h1>
          <div className="text-xl">
            <p className="text-3xl font-bold">New songs in your inbox</p>
            <p>
              We will only send occasional emails and you can unsubscribe at any
              time.
            </p>
          </div>
          <iframe
            scrolling="no"
            // style={{width: "100% !important"}}
            className="w-full h-64"
            src="https://buttondown.email/bsp?as_embed=true"
          ></iframe>
          <br />
          <br />
        </div>
      </Results>
    </Layout>
  );
}

export default Subscribe;
