import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout className="max-w-4xl mx-auto px-4 mt-6">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="About" />
      <h1 className="text-3xl">About</h1>
      <section className="max-w-sm">
        <div className="font-serif">
          <blockquote>
            Intone, O My servant, the verses of God that have been received by
            thee, as intoned by them who have drawn nigh unto Him, that the
            sweetness of thy melody may kindle thine own soul, and attract the
            hearts of all men...
          </blockquote>

          <div className="block mt-1 text-xs text-right">– Bahá’u’lláh</div>
        </div>
      </section>
      <section className="mt-8">
        <p>
          bahá’í song project was launched in 2011 by a group of friends who
          wanted to encourage others to sing and play Bahá’í songs in their
          communities. Over the years it has become a resource for people from
          all around the world who share the understanding that singing prayers
          and sacred verses can bring much joy and vibrancy to a community, and
          resources for learning to sing and play songs should be easily
          accessible. We hope this website can serve as a tool to create a
          joyous and uplifting atmosphere in your communities.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-bold">Contribute</h2>
        <p>
          There are many ways in which you can contribute.
        </p>
        <ul className="list-disc ml-4">
          <li className="">Share this website with your friends</li>
          <li>Report errors (you can use the <Link className="underline" to="/contact">contact form</Link>)</li>
          <li>Submit songs for publication  (you can use the <Link className="underline" to="/contact">contact form</Link>) </li>
          <li>Help out with the development  (the code is on <a className="underline" href="https://github.com/bahaisongproject">GitHub</a>) </li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-bold">Acknowledgements</h2>
        <p>
          This project would not be possible withouth the contributions of so
          many people. Thank you to
        </p>
        <ul className="list-disc ml-4">
          <li className="">All the friends who shared songs with us</li>
          <li>Chad for many brainstorming sessions</li>
          <li>Armin for the introduction to static site generators</li>
        </ul>
      </section>
    </Layout>
  );
}

export default AboutPage;
