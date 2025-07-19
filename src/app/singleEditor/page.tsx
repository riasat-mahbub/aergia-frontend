'use client'

import { ResumeForm } from "@/types/ResumeFormTypes";
import FormMapper from "./FormMapper";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getFormById } from "@/store/settingSlice";
import { useEffect, useState } from "react";

export default function SingleEditor() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('formId');
  const formEntry = useSelector((state: RootState) => formId ? getFormById(state, formId) : null);
  const selectedForm = formEntry ? formEntry[0] as ResumeForm : null;

  if (!selectedForm) {
    return <div className="p-6">Form not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit: {selectedForm.title}</h1>
      <FormMapper form={selectedForm} />
    </div>
  );
}