import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Results from "../components/Results";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

function Contact() {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };

  const [state, setState] = useState({
    isLoading: false,
    submitted: false,
    "gdpr-check": false,
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
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="Contact"
        image={image}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6 mb-2">
          <h1 className="text-3xl text-gray-900 leading-tight font-extrabold">
            Contact
          </h1>
          <div className="mt-8 prose">
            <p className=" font-bold">We would love to hear from you.</p>
            <p>
              Tell us what your favorite song is, report an error or just say
              hi!
            </p>
            <p>Here are some of the things you could write us</p>
            <ul>
              <li>Tell us what your favorite song is</li>
              <li>Report an error</li>
              <li>Just say hi</li>
              <li>Share how you use bahá&apos;í song project</li>
              <li>
                Ask a question about <Link to="/contribute">contributing</Link>
              </li>
            </ul>
          </div>
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
                placeholder="Your name"
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
                placeholder="Your email"
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
                placeholder="Your message"
                onChange={handleChange}
              />
            </div>
            <div className="gdpr-check flex items-baseline py-4">
              <input
                type="checkbox"
                name="gdpr-check"
                checked={state["gdpr-check"]}
                onChange={handleChange}
                aria-required="true"
                required
              />
              <div className="pl-2">
                I have read and agree to the{" "}
                <Link className="underline" to="/privacy">
                  privacy policy
                </Link>
              </div>
            </div>
            <input
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              type="submit"
              value={
                state.isLoading ? "..." : state.submitted ? "Sent ✓" : "Send"
              }
              disabled={state["gdpr-check"] ? false : true}
            />
          </form>
        </div>
      </Results>
    </Layout>
  );
}

export default Contact;
