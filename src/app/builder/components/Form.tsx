"use client"
import { ResumeForm } from "@/types/ResumeFormTypes";
import { Eye, Trash2, GripVertical, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


import { deleteForm, setSelectedForm, updateForm } from "@/store/formSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";


interface BaseOptionProps {
  formHolderId: string;
  form: ResumeForm;
}



export default function Form({ formHolderId, form}: BaseOptionProps) {
  const dispatch = useDispatch();
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);
  const { updateFormHolder } = useFormHolders();

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
  
async function onEyeClick() {
  const currentFormHolder = formHolders.find(fh => fh.id === formHolderId);
  if (!currentFormHolder) return;

  // Find the updated form
  const updatedForms = currentFormHolder.data.map((f: ResumeForm) =>
    f.id === form.id ? { ...f, visible: !f.visible } : f
  );

  // Extract the form we just toggled
  const updatedForm = updatedForms.find(f => f.id === form.id);
  if (!updatedForm) return;

  // Build holder object for API
  const updatedFormHolder = {
    ...currentFormHolder,
    data: updatedForms, // keep array form for Redux
  };

  try {
    await updateFormHolder(updatedFormHolder);

    // Update Redux with the single updated form
    dispatch(updateForm({
      formHolderId: updatedFormHolder.id,
      form: updatedForm,
    }));
  } catch (err) {
    console.error("Failed to update form visibility:", err);
  }
}



  const onTrashClick = async () => {
    const currentFormHolder = formHolders.find(fh => fh.id === formHolderId);
    if (currentFormHolder) {
      const updatedData = currentFormHolder.data.filter(f => f.id !== form.id);
      const updatedFormHolder = {
        ...currentFormHolder,
        data: updatedData
      };
      
      await updateFormHolder(updatedFormHolder);
    }
    
    dispatch(deleteForm({
      formHolderId: formHolderId,
      formId: form.id
    }));
  };



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
        {form.visible ? <Eye onClick={onEyeClick}/> : <EyeOff onClick={onEyeClick}/>}
        <Trash2 onClick={onTrashClick}/>
      </div>
    </div>
  );
}


