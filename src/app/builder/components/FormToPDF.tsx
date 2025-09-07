"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function FormToPDF() {
  const printRef = useRef<HTMLDivElement>(null);

  const formHolders = useSelector((state: RootState) =>
    state.forms.formHolders.filter((holder) => holder.visible !== false)
  );

  const handlePrint = useReactToPrint({
    contentRef: printRef, // ✅ new API
    pageStyle: `
      @page {
        size: A4;
        margin: 1cm; /* small margin so content doesn't touch edges */
      }
      body {
        -webkit-print-color-adjust: exact;
        margin: 0;
        padding: 0;
      }
    `,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Print to PDF
      </button>

      <div className="mb-6 overflow-auto flex justify-center">
        <div className="bg-gray-100 rounded-lg shadow-lg">
          <div
            className="bg-white border border-gray-300 shadow-sm transform origin-top"
            style={{ width: "794px", minHeight: "1123px" }}
          >
            <div ref={printRef} className="p-6">
              {formHolders.map((formHolder) => (
                <FormHolderPreview
                  formHolder={formHolder}
                  key={formHolder.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
