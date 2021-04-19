import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SongCard from "../components/SongCard";
import Results from "../components/Results";
import Button from "../components/Button";

function ContributorTemplate({ data }) {
  const contributor = data.bsp.contributor;
  const contributorSongList = contributor.songs.sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  return (
    <Layout>
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
            <div className="mt-4 grid gap-x-3 gap-y-6 md:gap-x-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
              {(() => {
                if (contributorSongList) {
                  return contributorSongList.map((song) => (
                    <SongCard key={song.slug} song={song} />
                  ));
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
