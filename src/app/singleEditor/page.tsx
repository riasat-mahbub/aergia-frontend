'use client'

import { ResumeForm } from "@/types/ResumeFormTypes";
import FormMapper from "./FormMapper";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getFormById } from "@/store/formSlice";

export default function SingleEditor() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('formId');
  const formHolderId = searchParams.get('formHolderId');
  const selectedForm = useSelector((state: RootState) => 
    formId && formHolderId ? getFormById(state, formHolderId, formId) : null
  );

  if (!selectedForm || !formHolderId) {
    return <div className="p-6">Form not found or missing form holder ID</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit: {selectedForm.title}</h1>
      <FormMapper form={selectedForm} formHolderId={formHolderId} />
    </div>
  );
}