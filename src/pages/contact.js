import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function ContactPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Contact"
      />
      <section>
        <form className="mx-auto md:w-1/2">
          <p className="mb-8 leading-loose">
            Message us!
          </p>

          <label
            className="block mb-2 text-xs font-bold uppercase px-3"
            htmlFor="first-name"
          >
            Name
          </label>

          <input
            className="w-full mb-6 form-input focus:outline-none border border-blue-800 rounded-lg px-3 py-2"
            id="first-name"
            type="text"
          />

          <label
            className="block mb-2 text-xs font-bold uppercase px-3"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="w-full mb-6 form-input focus:outline-none border border-blue-800 rounded-lg px-3 py-2"
            id="email"
            type="text"
          />

          <label
            className="block mb-2 text-xs font-bold uppercase px-3"
            htmlFor="message"
          >
            Message
          </label>

          <textarea
            className="w-full mb-6 form-textarea focus:outline-none resize-none border border-blue-800 rounded-lg px-3 py-2"
            id="message"
            rows="8"
          />

          <button className="px-4 py-2 text-sm font-bold text-white bg-yellow-500 border-b-4 border-yellow-600 rounded hover:border-yellow-700 hover:bg-yellow-600">
            Submit
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default ContactPage;
