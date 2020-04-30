import React from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";

function ContactPage() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <Layout className="max-w-4xl">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Contact" />
      <h1 className="text-3xl">Contact</h1>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="contact"
          name="contact"
          method="post"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <label
            className="block text-gray-700 text-sm font-bold mt-4 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            ref={register({ required: true, maxLength: 80 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            className="block text-gray-700 text-sm font-bold mt-4 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <label
            className="block text-gray-700 text-sm font-bold mt-4 mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            ref={register({ required: true })}
            className="shadow resize-none appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            type="submit"

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ContactPage;
