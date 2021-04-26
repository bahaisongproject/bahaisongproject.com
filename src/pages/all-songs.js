import React from "react";
import { graphql, Link } from "gatsby";
import { DocumentDownloadIcon } from "@heroicons/react/outline";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongCard from "../components/SongCard";
import Results from "../components/Results";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
    cell: (row) => (
      <Link className="hover:underline" to={`/${row.slug}`}>
        {row.title}
      </Link>
    ),
  },
  {
    name: "Music",
    selector: "music",
    sortable: true,
  },
  {
    name: "Words",
    selector: "words",
    sortable: true,
  },
  {
    name: "Song Sheet",
    sortable: false,
    center: true,
    cell: (row) => (
      <Link className="hover:underline" to={`/${row.slug}.pdf`}>
        <DocumentDownloadIcon className="w-6 h-6" aria-hidden="true" />
      </Link>
    ),
  },
];

function AllSongs({ data }) {
  const image = {
    src: `/meta.png`,
    width: 1200,
    height: 628,
  };
  const allSongList = data.bsp.songs.sort((a, b) => (a.slug > b.slug ? 1 : -1));
  return (
    <Layout>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title="All Songs"
        image={image}
      />
      <Results>
        <div className="flex justify-center px-4 mt-6 mb-4">
          <h1 className="text-2xl text-gray-900 leading-none font-extrabold">
            All Songs
          </h1>
        </div>

        {/* Song Grid */}
        <div className="max-w-4xl mx-auto">
          <DataTable
            noHeader
            columns={columns}
            data={allSongList}
            pagination
            paginationRowsPerPageOptions={[10, 50, 100, 200, 500]}
            paginationPerPage={50}
          />
        </div>
      </Results>
    </Layout>
  );
}

export default AllSongs;

export const query = graphql`
  query {
    bsp {
      songs {
        title
        music
        words
        slug
        song_description
        languages {
          language_name_en
          language_code
        }
        tags {
          tag_id
          tag_name
          tag_slug
        }
        contributors {
          contributor_id
          contributor_slug
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
