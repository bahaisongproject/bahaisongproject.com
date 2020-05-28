import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function LegalPage() {
  return (
    <Layout className="max-w-4xl mx-auto px-4 mt-6">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Legal" />
        <div className="text-lg">
            <h1 className="text-2xl">Legal Information</h1>
            <p>
            bahá&apos;í song project is not an official Bahá&apos;í site but an individual initiative.
            You can visit the official website of the worldwide Bahá&apos;í community at <a className="underline" href="https://www.bahai.org">www.bahai.org</a>.
            </p>
            
            <p className="mt-8 font-bold uppercase">Information in accordance with §5 TMG</p>

            <h2 className="mt-4 text-xl font-bold">Represented by</h2>
            Dayyan Smith

            <h2 className="mt-4 text-xl font-bold">Contact</h2>
            <ul className="list-disc ml-4">
                <li>E-Mail: bahaisongproject@gmail.com</li>
                <li>Contact form: <Link className="underline" to="/contact">https://www.bahaisongproject.com/contact</Link></li>
            </ul>


            <h2 className="mt-4 text-xl font-bold">Person responsible for content in accordance with §55 section 2 RStV</h2>
            Dayyan Smith

            <h2 className="mt-4 text-xl font-bold">Disclaimer</h2>
            <h3 className="mt-4 text-lg font-bold">Accountability for content</h3>
            <p>
                We have created and curated the content on this site with care. But we cannot guarantee the content&apos;s accuracy.
                The links to other websites have been carefully selected but the responsibility for the content on these sites lies with the operators of those websites.
            </p>
            <h3 className="mt-4 text-lg font-bold">Copyright</h3>
            <p>
                The songs on our site belong to their respective copyright holders. We have tried to accurately attribute the copyright holders for each song. If you should find any inaccuracies in the attribution or you are a copyright holder and would like a song of yours to be taken down, please <Link className="underline" to="/contact">let us know</Link>.
            </p>
        </div>
    </Layout>
  );
}

export default LegalPage;
