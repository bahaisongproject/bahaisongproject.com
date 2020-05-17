import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongCard from "../components/SongCard";
import PropTypes from "prop-types";
import Hit from "../components/Hit"
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";


const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Home" />
      <InstantSearch searchClient={searchClient} indexName="bsp-songs">
          <div className="flex justify-center mb-6">
            <SearchBox />
          </div>
          <Hits hitComponent={Hit} />
        </InstantSearch>
      {/* <section>
        <div className="flex flex-wrap justify-around">
          {data.bsp.songs.map((song) => (
            <SongCard song={song} key="0" />
          ))}
        </div>
      </section> */}
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
