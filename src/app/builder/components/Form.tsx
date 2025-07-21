"use client"
import { ResumeForm, ResumeFormBase } from "@/types/ResumeFormTypes";
import { Eye, EyeClosed, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { deleteForm, setFormToShow, updateForm } from "@/store/formSlice";
import { FormHolder } from "@/types/FormHolderTypes";

interface BaseOptionProps {
  formHolderId: string;
  form: ResumeForm;
}

export default function Form({ formHolderId, form}: BaseOptionProps) {
  const [visibility, setVisibility] = useState(true);
  const dispatch = useDispatch();
  
  function onEyeClick(){
    setVisibility(!visibility);
    dispatch(setFormToShow({
      formHolderId: formHolderId,
      formId: form.id
    }));
  }

  function onTrashClick(){
    dispatch(deleteForm({
      formHolderId: formHolderId,
      formId: form.id
    }));
  }



  return (
    <div className="flex flex-row items-center justify-between my-4 ml-1">
      <Link 
        href={{
          pathname: "/singleEditor",
          query: {
            formHolderId: formHolderId, 
            formId: form.id }
        }}
      >
        {form.title}
      </Link>
      
      <div className="flex flex-row gap-2">
        {visibility ? <Eye onClick={onEyeClick}/> : <EyeClosed onClick={onEyeClick}/>}
        <Trash2 onClick={onTrashClick}/>
      </div>
    </div>
  );
}


