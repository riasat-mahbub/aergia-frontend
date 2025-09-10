"use client"
import { Document, Page, pdf } from "@react-pdf/renderer";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

export default function FormToPDF() {
  const formHolders = useSelector(
  (state: RootState) =>
    state.forms.formHolders.filter((holder) => holder.visible !== false),
  shallowEqual
);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(
        <Document>
          <Page size="A4" style={{ padding: 30 }}>
            {formHolders.map((formHolder) => (
              <FormHolderPreview
                formHolder={formHolder}
                key={formHolder.id}
              />
            ))}
          </Page>
        </Document>
      ).toBlob();
      setPdfBlobUrl(URL.createObjectURL(blob));
    };

    generatePdf();
  }, [formHolders]);

  return (
    
     <object
      data={pdfBlobUrl}
      type="application/pdf"
      width="100%"
      height="1123px"
    />

  );
}
