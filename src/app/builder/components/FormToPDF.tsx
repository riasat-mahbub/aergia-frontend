"use client";

import { Document, Page, pdf } from "@react-pdf/renderer";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";
import { useMemo, useEffect } from "react";
import { setPdfUrl } from "@/store/pdfSlice";

export default function FormToPDF() {
  const dispatch = useDispatch();
  const pdfUrl = useSelector((state: RootState) => state.pdf.pdfUrl);
  const formHolders = useSelector(
    (state: RootState) =>
      state.forms.formHolders.filter((holder) => holder.visible !== false),
    shallowEqual
  );
  const cvTemplate = useSelector((state: RootState) => state.forms.cvTemplate);

  const documentContent = useMemo(() => {
    return formHolders.map((formHolder) => (
      <FormHolderPreview
        key={formHolder.id}
        formHolder={formHolder}
        cvTemplate={cvTemplate}
      />
    ));
  }, [formHolders, cvTemplate]);

  useEffect(() => {
    if (!formHolders.length) return;

    const generatePdf = async () => {
      const doc = (
        <Document>
          <Page size="A4" style={{ padding: 30 }}>
            {documentContent}
          </Page>
        </Document>
      );
      
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      dispatch(setPdfUrl(url));
    };

    generatePdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        dispatch(setPdfUrl(null));
      }
    };
  }, [documentContent, formHolders.length]);

  if (!formHolders.length) {
    return <Spinner />;
  }

  if (!pdfUrl) {
    return <Spinner />;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <object
        data={pdfUrl}
        type="application/pdf"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      >
        <p>PDF cannot be displayed</p>
      </object>
    </div>
  );
}
