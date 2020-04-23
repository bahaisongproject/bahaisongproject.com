import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="About"
      />

      <section className="max-w-sm">
        <div className="">
          <blockquote className="font-serif ">
            Intone, O My servant, the verses of God that have been received by
            thee, as intoned by them who have drawn nigh unto Him, that the
            sweetness of thy melody may kindle thine own soul, and attract the
            hearts of all men...
          </blockquote>

          <div className="block mt-1 text-xs font-serif text-right uppercase">
            – Bahá’u’lláh
          </div>
        </div>
      </section>
      <section className="max-w-sm mt-8">
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
    </Layout>
  );
}

export default AboutPage;
