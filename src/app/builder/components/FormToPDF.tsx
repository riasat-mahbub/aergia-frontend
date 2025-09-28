"use client"
import { Document, Page, pdf } from "@react-pdf/renderer";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

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
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const generatePdf = async () => {
      if (!isMounted) return;
      
      setIsGenerating(true);
      try {
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
        
        if (isMounted) {
          setPdfBlobUrl(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        if (isMounted) {
          setIsGenerating(false);
        }
      }
    };

    generatePdf();

    return () => {
      isMounted = false;
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [formHolders]);

  if (isGenerating || !pdfBlobUrl) {
    return <Spinner />;
  }

  return (
    <object
      data={pdfBlobUrl}
      type="application/pdf"
      width="100%"
      height="1123px"
    />
  );
}