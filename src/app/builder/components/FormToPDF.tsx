"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { printRef } from "./printRef";

export default function FormToPDF() {

  const formHolders = useSelector((state: RootState) =>
    state.forms.formHolders.filter((holder) => holder.visible !== false)
  );

  return (
    <div className="flex flex-col items-center w-full">

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
