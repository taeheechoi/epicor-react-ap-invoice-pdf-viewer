import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function PDFViewer(props) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const { pdf } = props;

    return (
        <div>
            {pdf &&
                <Document file={`data:application/pdf;base64,${pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (_, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                </Document>
            }
        </div>
    );
}
