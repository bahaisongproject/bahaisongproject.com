import React from "react";
import { graphql } from "gatsby";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  return (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          Default Preview Image
        </div>
  );
}
