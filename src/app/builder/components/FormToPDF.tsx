"use client";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function FormToPDF() {
  const formHolders = useSelector((state: RootState) =>
    state.forms.formHolders.filter((holder) => holder.visible !== false)
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-6 overflow-auto flex justify-center" style={{ width: "794px", height: "1123px" }}>
        <PDFViewer width="100%" height="100%">
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
        </PDFViewer>
      </div>
    </div>
  );
}
