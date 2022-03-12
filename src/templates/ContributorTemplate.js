import { graphql, Link } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Results from "../components/Results";
import Button from "../components/Button";
import DataTable from "react-data-table-component";
import { DocumentDownloadIcon } from "@heroicons/react/outline";
import { OutboundLink } from "gatsby-plugin-gtag";

const dateOptions = { year: "numeric", month: "long", day: "numeric" };

const columns = [
  {
    name: "Song",
    selector: "title",
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div className="py-2 gap-y-1 flex flex-col">
        <Link className="hover:underline font-bold" to={`/${row.slug}`}>
          {row.title}
        </Link>
        <div className="italic">{row.music}</div>
      </div>
    ),
  },
  {
    name: "Published",
    selector: "created_at",
    sortable: true,
    wrap: true,
    grow: 1,
    format: (row) =>
      new Date(row.created_at).toLocaleDateString("en-gb", dateOptions),
  },
  {
    name: "Song Sheet",
    sortable: false,
    center: true,
    width: "60px",
    cell: (row) => (
      <OutboundLink
        className="hover:underline"
        href={`https://www.bahaisongproject.com/${row.slug}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <DocumentDownloadIcon className="w-6 h-6" aria-hidden="true" />
      </OutboundLink>
    ),
  },
];

function ContributorTemplate({ data, location }) {
  const contributor = data.bsp.contributor;
  const contributorSongList = contributor.songs.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  return (
    <Layout location={location}>
      <SEO
        keywords={[`bahai`, `song`, `music`, `chords`]}
        title={contributor.contributor_name}
      />
      <Results>
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <h2 className="text-lg text-gray-700 uppercase font-bold">
            Contributor
          </h2>
          <h1 className="text-3xl font-semibold">
            {contributor.contributor_name}
          </h1>
          {(() => {
            if (contributor.contributor_url) {
              return <Button url={contributor.contributor_url}>Website</Button>;
            }
          })()}
          <div className="mt-4 ">
            <div className="max-w-4xl mx-auto">
              {(() => {
                if (contributorSongList) {
                  return (
                    <DataTable
                      noHeader
                      columns={columns}
                      data={contributorSongList}
                    />
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </Results>
    </Layout>
  );
}

export const query = graphql`
  query($contributorId: Int!) {
    bsp {
      contributor(where: { contributor_id: $contributorId }) {
        contributor_name
        contributor_url
        songs {
          title
          slug
          created_at
          music
          contributors {
            contributor_id
            contributor_slug
            contributor_name
            contributor_url
          }
          languages {
            language_code
            language_name_en
          }
          tags {
            tag_id
            tag_name
            tag_slug
          }
          performances {
            performance_prio
            content_url
          }
        }
      }
    }
  }
`;

export default ContributorTemplate;
