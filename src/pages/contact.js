import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Results from "../components/Results"


function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function Contact() {
  const [state, setState] = useState({
    isLoading: false,
    submitted: false,
    "DSVGO-Check": false,
  });

  function handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() =>
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          submitted: true,
        }))
      )
      .catch((error) => alert(error));
  }

  return (
    <Layout >
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Contact" />
      <Results>
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <h1 className="text-6xl font-extrabold">Contact</h1>
        <form
          className="pt-8"
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <div>
            <input
              className="w-full xs:max-w-xs pl-3 pr-2 py-2 appearance-none bg-gray-200 outline-none rounded-md"
              type="text"
              name="name"
              aria-required="true"
              required
              placeholder="Name"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <input
              className="w-full xs:max-w-xs pl-3 pr-2 py-2 appearance-none bg-gray-200 outline-none rounded-md"
              type="email"
              name="Email"
              aria-required="true"
              required
              placeholder="E-Mail"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <textarea
              className="w-full xs:max-w-xs h-48 pl-3 pr-2 py-2 appearance-none resize-none bg-gray-200 outline-none rounded-md"
              name="message"
              aria-required="true"
              required
              placeholder="Message"
              onChange={handleChange}
            />
          </div>
          <div className="gdpr-check flex items-baseline py-4">
            <input
              type="checkbox"
              name="DSVGO-Check"
              checked={state["DSVGO-Check"]}
              onChange={handleChange}
              aria-required="true"
              required
            />
            <div className="pl-2">
              I have read and agree to the <Link className="underline" to="/privacy">privacy policy</Link>
            </div>
          </div>
          <input
            className="bg-topaz hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value={state.isLoading ? "..." : state.submitted ? "Sent" : "Send"}
            disabled={state["DSVGO-Check"] ? false : true}
          />
        </form>
      </div>
      </Results>
    </Layout>
  );
}

export default Contact;
