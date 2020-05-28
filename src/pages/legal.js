import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function LegalPage() {
  return (
    <Layout className="max-w-4xl mx-auto px-4 mt-6">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Legal" />
        <div>
            <h1 className="text-2xl">Legal Information</h1>
        </div>
    </Layout>
  );
}

export default LegalPage;
