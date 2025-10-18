"use client";

import { useCollapse } from "react-collapsed";
import { ChevronDown, ChevronLeft, Plus, GripVertical, Trash2, Eye, EyeOff, Palette } from "lucide-react";
import { FormHolder } from "@/types/FormHolderTypes";
import { useDispatch, useSelector } from "react-redux";
import { addForm, updateFormHolder, reorderForms, setSelectedForm } from "@/store/formSlice";
import { setExpandedFormHolder, setSelectedStyleEditor } from "@/store/settingSlice";
import { RootState } from "@/store/store";
import { useFormHolders } from "@/hooks/useFormHolders";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createFormByType } from "./FormTemplates";
import { iconOptions } from "./IconOptions";
import IconInput from "../IconInput";
import Form from "../Form";

interface FormHolderProps {
  formHolder: FormHolder;
  onDeleteClick: (formHolderId: string) => void;
}

export default function FormHolderCard({ formHolder, onDeleteClick }: FormHolderProps) {
  const dispatch = useDispatch();
  const { updateFormHolder: updateFormHolderAPI } = useFormHolders();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFormDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      dispatch(reorderForms({
        formHolderId: formHolder.id,
        activeId: active.id.toString(),
        overId: over.id.toString()
      }));
    }
  };
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: formHolder.id });
  
  const expandedFormHolder = useSelector((state: RootState) => state.settings.expandedFormHolder);
  const isExpanded = expandedFormHolder === formHolder.id;
  
  const { getCollapseProps } = useCollapse({ isExpanded });
  
  const handleToggle = () => {
    dispatch(setExpandedFormHolder(isExpanded ? null : formHolder.id));
  };

  const handleTitleChange = async (title: string) => {
    const updatedFormHolder = { ...formHolder, title };

    try {
      await updateFormHolderAPI(updatedFormHolder);    
      dispatch(updateFormHolder(updatedFormHolder));
    } catch (exception) {
      console.error("Failed to update title:", exception);
    }
  };

  const handleVisibilityToggle = async () => {
    const updatedFormHolder = { ...formHolder, visible: !formHolder.visible };

    try {
      await updateFormHolderAPI(updatedFormHolder);
      dispatch(updateFormHolder(updatedFormHolder));
    } catch (err) {
      console.error("Failed to update visibility:", err);
    }
  };

  const addNewForm = async () => {
    const count = formHolder.data.length + 1;
    const newForm = createFormByType(formHolder.type, count);
    
    dispatch(addForm({ formHolderId: formHolder.id, form: newForm }));
    dispatch(setSelectedForm({ formHolderId: formHolder.id, form: newForm }));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 40 : 1
  };

  const currentIcon = iconOptions.find((icon) => icon.name === formHolder.icon)?.icon;

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-3 rounded-md bg-white shadow transition-opacity duration-200"
    >
      {/* Header */}
      <div className="flex flex-row items-center gap-4 pl-4 py-4 pr-3">
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-grab hover:text-emerald-500 mr-1"
        >
          <GripVertical size={20} />
        </div>
        
        {isExpanded ? (
          <IconInput
            value={formHolder.title}
            iconValue={formHolder.icon}
            onChange={handleTitleChange}
            placeholder="Custom Form"
          />
        ) : (
          <div className="w-full flex items-center p-2 cursor-pointer" onClick={handleToggle}>
            <span className="mr-2">{currentIcon}</span>
            <div className="ml-2">{formHolder.title}</div>
          </div>
        )}
        
        {isExpanded ? (
          <ChevronDown onClick={handleToggle} size={32} className="cursor-pointer" />
        ) : (
          <ChevronLeft onClick={handleToggle} size={32} className="cursor-pointer" />
        )}
      </div>

      {/* Collapsible Content */}
      {Array.isArray(formHolder.data) && (
        <div {...getCollapseProps()} className="flex flex-col mx-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleFormDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={formHolder.data.map(form => form.id)}
              strategy={verticalListSortingStrategy}
            >
              {formHolder.data.map((form) => (
                <Form key={form.id} formHolderId={formHolder.id} form={form} />
              ))}
            </SortableContext>
          </DndContext>

          {/* Footer Actions */}
          <div className="flex justify-between items-center border-t-2 border-neutral-300 py-4 w-full">
            <button
              className="flex flex-row gap-2 rounded-full border-1 p-2 px-5 border-gray-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={addNewForm}
            >
              <Plus />
              {formHolder.type[0].toUpperCase() + formHolder.type.slice(1)}
            </button>
            
            <div className="flex flex-row gap-3">
              <Palette 
                className="text-orange-600 cursor-pointer" 
                onClick={() => dispatch(setSelectedStyleEditor(formHolder.id))} 
              />
              
              {formHolder.visible ? (
                <Eye className="text-red-950 cursor-pointer" onClick={handleVisibilityToggle} />
              ) : (
                <EyeOff className="text-red-950 cursor-pointer" onClick={handleVisibilityToggle} />
              )}
              
              <Trash2 
                className="text-red-600 cursor-pointer" 
                onClick={() => onDeleteClick(formHolder.id)} 
              />
            </div>
          </div>
        </div>
      )}


    </div>
  );
}