import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function PrivacyPage() {
  return (
    <Layout className="max-w-4xl mx-auto px-4 mt-6">
      <SEO keywords={[`bahai`, `song`, `music`, `chords`]} title="Privacy Policy" />
      <h1 className="text-2xl">Privacy Policy</h1>
      <div>
        bahá&apos;í song project is a private initiative. This privacy policy
        will explain how we use the personal data we collect from you when you
        use our website.
        <h3 className="text-xl font-bold">
          bahá&apos;í song project collects the following data
        </h3>
        <ul className="list-disc">
          <li>Personal identification information (name, email address)</li>
        </ul>
        <h3 className="text-xl font-bold">How do we collect your data?</h3>
        You directly provide bahá&apos;í song project with most of the data we
        collect. We collect data and process data when you:
        <ul className="list-disc">
          <li>Contact us</li>
          <li>
            Voluntarily complete a survey or provide feedback on via contact
            form or via email
          </li>
          <li>Use or view our website via your browser’s cookies.</li>
        </ul>
        <h3 className="text-xl font-bold">How will we use your data?</h3>
        bahá&apos;í song project collects your data so that we can:
        <ul className="list-disc">
          <li>Reply to messages</li>
          <li>Send email updates</li>
        </ul>
        <h3 className="text-xl font-bold">How do we store your data?</h3>
        bahá&apos;í song project securely stores your data. bahá&apos;í song
        project will keep your data for one year. Once this time period has
        expired, we will delete your data.
        <h3 className="text-xl font-bold">
          What are your data protection rights?
        </h3>
        bahá&apos;í song project would like to make sure you are fully aware of
        all of your data protection rights. Every user is entitled to the
        following:
        <ul className="list-disc">
          <li>
            The right to access – You have the right to request bahá&apos;í song
            project for copies of your personal data. We may charge you a small
            fee for this service.
          </li>
          <li>
            The right to rectification – You have the right to request that
            bahá&apos;í song project correct any information you believe is
            inaccurate. You also have the right to request bahá&apos;í song
            project to complete the information you believe is incomplete.
          </li>
          <li>
            The right to erasure – You have the right to request that
            bahá&apos;í song project erase your personal data, under certain
            conditions.
          </li>
          <li>
            The right to restrict processing – You have the right to request
            that bahá&apos;í song project restrict the processing of your
            personal data, under certain conditions.
          </li>
          <li>
            The right to object to processing – You have the right to object to
            bahá&apos;í song project’s processing of your personal data, under
            certain conditions.
          </li>
          <li>
            The right to data portability – You have the right to request that
            bahá&apos;í song project transfer the data that we have collected to
            another organization, or directly to you, under certain conditions.
          </li>
        </ul>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, email us at
        bahaisongproject@gmail.com or use our contact form.
        <h3 className="text-xl font-bold">Cookies</h3>
        Cookies are text files placed on your computer to collect standard
        Internet log information and visitor behavior information. When you
        visit our websites, we may collect information from you automatically
        through cookies or similar technology For further information, visit
        allaboutcookies.org.
        <h3 className="text-xl font-bold">How do we use cookies?</h3>
        bahá&apos;í song project uses cookies in a range of ways to improve your
        experience on our website, including:
        <ul className="list-disc">
          <li>Understanding how you use our website</li>
        </ul>
        <h3 className="text-xl font-bold">What types of cookies do we use?</h3>
        There are a number of different types of cookies, however, our website
        uses:
        <ul className="list-disc">
          <li>
            Functionality – bahá&apos;í song project uses these cookies so that
            we recognize you on our website and remember your previously
            selected preferences. These could include what language you prefer
            and location you are in. A mix of first-party and third-party
            cookies are used.
          </li>
        </ul>
        <h3 className="text-xl font-bold">How to manage cookies</h3>
        You can set your browser not to accept cookies, and the above website
        tells you how to remove cookies from your browser. However, in a few
        cases, some of our website features may not function as a result.
        <h3 className="text-xl font-bold">
          Privacy policies of other websites
        </h3>
        The bahá&apos;í song project website contains links to other websites.
        Our privacy policy applies only to our website, so if you click on a
        link to another website, you should read their privacy policy.
        <h3 className="text-xl font-bold">Changes to our privacy policy</h3>
        bahá&apos;í song project keeps its privacy policy under regular review
        and places any updates on this web page. This privacy policy was last
        updated on 28 May 2020.
        <h3 className="text-xl font-bold">How to contact us</h3>
        If you have any questions about bahá&apos;í song project’s privacy
        policy, the data we hold on you, or you would like to exercise one of
        your data protection rights, please do not hesitate to contact us. Email
        us at bahaisongproject@gmail.com or use our contact form.
        <h3 className="text-xl font-bold">
          How to contact the appropriate authority
        </h3>
        Should you wish to report a complaint or if you feel that bahá&apos;í
        song project has not addressed your concern in a satisfactory manner,
        you may contact the Information Commissioner’s Office.
        <ul className="list-disc">
          <li>Email: poststelle@bfdi.bund.de</li>
          <li>Phone: +49 (0)228-997799-0</li>
          <li>
            Address: Der Bundesbeauftragte für den Datenschutz und die
            Informationsfreiheit - Graurheindorfer Str. 153 - 53117 Bonn
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default PrivacyPage;
