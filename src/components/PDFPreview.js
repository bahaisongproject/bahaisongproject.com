import React from "react";
import { Link } from "gatsby";
import { Document, Page } from "react-pdf";
import DownloadButton from "./DownloadButton"

const PDFPreview = ({ song }) => (
    <Link to={"/" + song.slug + ".pdf"}>
        <div className="inline-flex my-4">
            <Document className="shadow-sm" file={"/" + "test" + ".pdf"} >
                <Page pageNumber={1} width="150"/>
            </Document>
        </div>
    </Link>
);

export default PDFPreview;
