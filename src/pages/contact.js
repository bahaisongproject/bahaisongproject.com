import React, { useState } from "react";
import Layout from "../components/layout";

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
    <Layout>
      <div>
        <p>
          Contact
        </p>
      </div>
      <div role="form">
        <form
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
          <p>
            <span>
              <input
                type="text"
                name="name"
                size="40"
                aria-required="true"
                required
                placeholder="Name"
                onChange={handleChange}
              />
            </span>
            <br />
            <span>
              <input
                type="email"
                name="E-Mail"
                size="40"
                className=""
                aria-required="true"
                required
                placeholder="E-Mail"
                onChange={handleChange}
              />
            </span>
            <br />
            <span>
              <textarea
                name="message"
                cols="40"
                rows="10"
                className=""
                aria-required="true"
                required
                placeholder="Message"
                onChange={handleChange}
              />
            </span>
            <br />
            <br />
            <span className="gdpr-check">
              <input
                type="checkbox"
                name="DSVGO-Check"
                checked={state["DSVGO-Check"]}
                onChange={handleChange}
                aria-required="true"
                required
              />
              <span className="">
                GDPR
              </span>
            </span>
          </p>
          <p>
            <input
              className={state.submitted ? "submitted" : ""}
              type="submit"
              value={
                state.isLoading
                  ? "..."
                  : state.submitted
                  ? "Sent"
                  : "Sent"
              }
              disabled={state["DSVGO-Check"] ? false : true}
            />
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;