"use client"
import { ResumeFormBase } from "@/types/ResumeFormTypes";
import { Eye, EyeClosed, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteForm, setFormToShow } from "@/store/settingSlice";
import Link from "next/link";

interface BaseOptionProps {
  form: ResumeFormBase;
  isVisible: boolean;
}

export default function BaseOption({ form, isVisible: initialIsVisible }: BaseOptionProps) {
  const [visibility, setVisibility] = useState(initialIsVisible);
  const dispatch = useDispatch();
  
  function onEyeClick(){
    setVisibility(!visibility);
    dispatch(setFormToShow(form.id));
  }

  function onTrashClick(){
    dispatch(deleteForm(form.id));
  }



  return (
    <div className="flex flex-row items-center justify-between my-4 ml-1">
      <Link 
        href={{
          pathname: "/singleEditor",
          query: { formId: form.id }
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


