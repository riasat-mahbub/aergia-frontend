"use client";

import { FormHolder } from "@/types/FormHolderTypes";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useRef } from "react";
import ResumeDocument from "./ResumeDocument";

const PDFDownload = ({ formHolders }: { formHolders: FormHolder[] }) => {
  // Generate a unique key for the PDFDownloadLink based on form data
  const formDataKey = useRef(JSON.stringify(formHolders));
  
  // Update the key when form data changes
  if (formDataKey.current !== JSON.stringify(formHolders)) {
    formDataKey.current = JSON.stringify(formHolders);
  }
  
  return (
    <PDFDownloadLink
      document={<ResumeDocument formHolders={formHolders} />}
      fileName="resume.pdf"
      className="flex items-center justify-center px-5 py-3 bg-emerald-500 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
      key={formDataKey.current} // Force re-render when data changes
    >
      {({ blob, url, loading, error }) => {
        if (loading) return "Generating PDF...";
        if (error) return "Error generating PDF!";

        return (
          <>
            <Download size={20} />
            <span className="ml-2">Download PDF</span>
          </>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFDownload;