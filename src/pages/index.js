import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from "prop-types";
import { PoweredBy } from "react-instantsearch-dom";
import CustomSearchBox from "../components/SearchBox";
import HitList from "../components/HitList";
import Results from "../components/Results"

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Home" />
        <div className="flex justify-center items-center mt-6 my-2 mx-4 lg:hidden">
          <CustomSearchBox />
        </div>
        <Results>
          <HitList />
        </Results>
        <div className="flex justify-center mt-4">
          <Link className="border bg-emerald tracking-wide text-white px-4 py-2 rounded-full focus:outline-none" to="/all-songs">
              Find a list of all songs here
          </Link>
        </div>
        <div className="flex justify-center mt-8">
          <PoweredBy />
        </div>
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
        languages {
          language_name_en
          language_code
        }
        tags {
          tag_name
        }
        contributors {
          contributor_name
        }
        performances {
          content_url
        }
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
`;
