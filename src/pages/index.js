import React from "react";
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from 'prop-types';


function IndexPage({ data }) {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <section>
      <h2 className="font-semibold text-xs uppercase text-gray-800">By Language</h2>
      <div className="flex flex-wrap">
        {data.bsp.languages.map((language) => (
            <button className="bg-blue-400 tracking-wide text-xs text-gray-100 uppercase py-1 px-2 mr-1 mt-2 rounded-full hover:bg-blue-300 focus:outline-none focus:shadow-outline" key={language.language_code}>
                {language.language_name_en}
            </button>
        ))}
      </div>
      <ul>
      </ul>
      </section>
      <section className="mt-6">
      <h2 className="font-semibold text-xs uppercase text-gray-800">By Tag</h2>
      <div className="flex flex-wrap">
        {data.bsp.tags.map((tag) => (
            <button className="bg-red-400 tracking-wide text-xs text-gray-100  py-1 px-3 mr-1 mt-2 rounded-full hover:bg-red-300 focus:outline-none focus:shadow-outline" key={tag.tag_name}>
                {tag.tag_name}
            </button>
        ))}
      </div>
      </section>
      <section>
      <h2 className="mt-6 font-semibold text-xs uppercase text-gray-800">Songs</h2>
      <div className="flex flex-wrap">
        {data.bsp.songs.map((song) => (
            <div className="bg-red-400 tracking-wide text-xs text-gray-100  py-1 px-3 mr-1 mt-2 rounded-full hover:bg-red-300 focus:outline-none focus:shadow-outline" key={song.slug}>
                <Link to={song.slug}>{song.title}</Link>
            </div>
        ))}
      </div>
      </section>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.object,
};

export default IndexPage;

export const query = graphql`
  query {
    bsp {
      songs {
        title
        slug
      }
      languages {
        language_name_en
        language_code
      }
      tags {
        tag_name
      }
    }
  }
`