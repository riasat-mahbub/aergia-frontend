"use client";

import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";
import { useMemo } from "react";

export default function FormToPDF() {
  const formHolders = useSelector(
    (state: RootState) =>
      state.forms.formHolders.filter((holder) => holder.visible !== false),
    shallowEqual
  );
  const cvTemplate = useSelector((state: RootState) => state.forms.cvTemplate);

  // Use useMemo to avoid unnecessary re-renders
  const documentNode = useMemo(() => (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        {formHolders.map((formHolder) => (
          <FormHolderPreview
            key={formHolder.id}
            formHolder={formHolder}
            cvTemplate={cvTemplate}
          />
        ))}
      </Page>
    </Document>
  ), [formHolders, cvTemplate]);

  // Show a spinner if no forms yet
  if (!formHolders.length) {
    return <Spinner />;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <PDFViewer
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        showToolbar={false} // optional
      >
        {documentNode}
      </PDFViewer>
    </div>
  );
}
