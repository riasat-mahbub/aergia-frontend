"use client"
import { ResumeForm, ResumeFormBase } from "@/types/ResumeFormTypes";
import { Eye, EyeClosed, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";


import { deleteForm, setFormToShow, setSelectedForm, updateForm } from "@/store/formSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface BaseOptionProps {
  formHolderId: string;
  form: ResumeForm;
}



export default function Form({ formHolderId, form}: BaseOptionProps) {
  const [visibility, setVisibility] = useState(true);
  const dispatch = useDispatch();

  const onFormClick = (formHolderId: string, form: ResumeForm) => {
  dispatch(
    setSelectedForm({
      formHolderId: formHolderId,
      form: form
    })
  );
}
  
  // Setup sortable functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: form.id });
  
  // Apply styles for dragging
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1
  };
  
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
    <div 
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-center justify-between my-4 ml-1"
    >
      <div className="flex flex-row items-center cursor-pointer w-full" onClick={() => onFormClick(formHolderId, form)}>
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-grab hover:text-emerald-500 mr-3"
        >
          <GripVertical size={16} />
        </div>
        {form.title}
      </div>
      
      <div className="flex flex-row gap-2">
        {visibility ? <Eye onClick={onEyeClick}/> : <EyeClosed onClick={onEyeClick}/>}
        <Trash2 onClick={onTrashClick}/>
      </div>
    </div>
  );
}


