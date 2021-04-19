import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import Results from "../components/Results";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
  "https://bahaisongproject.us10.list-manage.com/subscribe/post?u=8e5884df65775290ed97fee2c&id=2680de1d60";

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = () =>
    onValidated({
      EMAIL: email.value,
    });

  return (
    <div className="mt-6">
      <input
        className="w-full xs:max-w-xs pl-3 pr-2 py-2 appearance-none bg-gray-200 outline-none rounded-md"
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <button
        className="block mt-6 xs:inline xs:ml-3 bg-gradient-to-r from-bspgreen to-bspblue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submit}
      >
        Sign up
      </button>
      <div className="mt-6">
        {status === "sending" && <div>Subscribing...</div>}
        {status === "error" && (
          <div
            dangerouslySetInnerHTML={{ __html: message.substring(4) }} // substring to remove "0 - " at beginning of every message
          />
        )}
        {status === "success" && (
          <div dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </div>
    </div>
  );
};

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
