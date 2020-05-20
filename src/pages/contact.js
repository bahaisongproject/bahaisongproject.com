import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Layout from "../components/layout";
import SEO from "../components/seo";

const required = "This field is required";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitted(true);
      reset();
    } catch (error) {
      setError(
        "submit",
        "submitError",
        `Oops! There seems to be an issue! ${error.message}`
      );
    }
  };

  const showSubmitError = (msg) => <p className="msg-error">{msg}</p>;

  const showThankYou = (
    <div className="msg-confirm">
      <p>Awesome! Your message was sent.</p>
      <button type="button" onClick={() => setSubmitted(false)}>
        Send another message?
      </button>
    </div>
  );

  const showForm = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input name="bot-field" ref={register()} />

      <label htmlFor="name">
        <h5>Name</h5>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          ref={register({ required })}
          disabled={isSubmitting}
        />
        {errors.name && <div className="msg-error">{errors.name.message}</div>}
      </label>

      <label htmlFor="email">
        <h5>Email</h5>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@email.address"
          ref={register({ required })}
          disabled={isSubmitting}
        />
        {errors.email && (
          <div className="msg-error">{errors.email.message}</div>
        )}
      </label>

      <label htmlFor="question">
        <h5>Message</h5>
        <textarea
          ref={register({ required })}
          name="message"
          id="message"
          rows="3"
          placeholder="Your message"
          disabled={isSubmitting}
        />
        {errors.question && (
          <div className="msg-error">{errors.question.message}</div>
        )}
      </label>

      <div className="submit-wrapper">
        <button type="submit" disabled={isSubmitting}>
          Send
        </button>
      </div>
    </form>
  );

  return (
    <Layout className="max-w-4xl">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Contact" />
      <h1 className="text-3xl">Contact</h1>
      <div className="w-full max-w-md">
        <div className="page contact-page">
          <div className="text-side">
            <h2>Contact me</h2>
            {errors && errors.submit && showSubmitError(errors.submit.message)}
          </div>
          <div className="form-side">{submitted ? showThankYou : showForm}</div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage;
