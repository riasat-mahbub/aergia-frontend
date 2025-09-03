"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ResumePreview from "./ResumePreview/ResumePreview";

export default function FormToPDF() {
  const formHolders = useSelector((state: RootState) =>
    state.forms.formHolders.filter((holder) => holder.visible !== false)
  );

  // Client-side only component
  if (typeof window === "undefined") {
    return null; // Return null during SSR
  }

  return (
    <div className="flex flex-col items-center w-full">
      {formHolders.length > 0 ? (
        <div className="mb-6 overflow-auto flex justify-center">
          <ResumePreview formHolders={formHolders} />
        </div>
      ) : (
        <div className="text-gray-500">Add content to generate a PDF</div>
      )}
    </div>
  );
}