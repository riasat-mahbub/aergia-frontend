"use client";

import { useEffect, useState } from "react";
import IconInput from "./IconInput";
import { useCollapse } from "react-collapsed";
import {
  ChevronDown,
  ChevronLeft,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  User,
  Plus,
  GripVertical,
  FolderOpen,
  Library,
  Star,
  Trash2,
} from "lucide-react";
import Form from "./Form";
import { FormHolder } from "@/types/FormHolderTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { useDispatch, useSelector } from "react-redux";
import { addForm, updateFormHolder, reorderForms, setSelectedForm } from "@/store/formSlice";
import { setExpandedFormHolder } from "@/store/settingSlice";
import { RootState } from "@/store/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { 
  emptyCustom, 
  emptyProfile, 
  emptyWorkExperience, 
  emptyEducation, 
  emptyProject, 
  emptySkills 
} from "@/constants/resumeFormTemplates";
import { v4 as uuidv4 } from "uuid";
import DeleteFormHolderPopover from "./popovers/DeleteFormHolderPopover";
import { popover } from "@/constants/popovers";
import PopoverDirector from "./popovers/PopoverDirector";

interface FormHolderOptions {
  formHolder: FormHolder;
}

export type IconOption = {
  name: string;
  icon: React.ReactNode;
};

export const iconOptions: IconOption[] = [
  { name: "Email", icon: <Mail size={18} /> },
  { name: "Phone", icon: <Phone size={18} /> },
  { name: "Star", icon: <Star size={18}/>},
  { name: "Globe", icon: <Globe size={18}/>},
  { name: "Library", icon: <Library size={18} /> },
  { name: "Folder", icon: <FolderOpen size={18} /> },
  { name: "Briefcase", icon: <Briefcase size={18} /> },
  { name: "GraduationCap", icon: <GraduationCap size={18} /> },
  { name: "Person", icon: <User size={18} /> },
];



export default function FormHolderCard({ formHolder }: FormHolderOptions) {
  const [formHolderTitle, setformHolderTitle] = useState(formHolder.title);
  const [formHolderIcon, setformHolderIcon] = useState(formHolder.icon);
  const [activePopover, setActivePopover] = useState<popover>(null);
  const dispatch = useDispatch();
  
  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance before a drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle drag end event for forms
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
  
  // Setup sortable functionality for the form holder itself
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: formHolder.id });
  
  // Get expandedFormHolder from Redux store
  const expandedFormHolder = useSelector((state: RootState) => state.settings.expandedFormHolder);
  const isExpanded = expandedFormHolder === formHolder.id;
  
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded
  });
  
  // Handle toggle click
  const handleToggle = () => {
    if (isExpanded) {
      dispatch(setExpandedFormHolder(null));
    } else {
      dispatch(setExpandedFormHolder(formHolder.id));
    }
  };

  useEffect(() => {
    setformHolderTitle(formHolder.title);
    setformHolderIcon(formHolder.icon);
  }, [formHolder]);

  const handleTitleChange = (title: string) => {
    setformHolderTitle(title);
    dispatch(
      updateFormHolder({
        ...formHolder,
        title,
      })
    );
  };

  const handleIconChange = (icon: string) => {
    setformHolderIcon(icon);
    dispatch(
      updateFormHolder({
        ...formHolder,
        icon,
      })
    );
  };

  const addNewForm = () => {
    let newForm;
    const count = formHolder.data.length + 1;
    
    // Create different form types based on formHolder.type
    switch(formHolder.type) {
      case 'profile':
        newForm = { ...emptyProfile, id: uuidv4(), title: `Profile ${count}` };
        break;
      case 'workExperience':
        newForm = { ...emptyWorkExperience, id: uuidv4(), title: `Work Experience ${count}` };
        break;
      case 'education':
        newForm = { ...emptyEducation, id: uuidv4(), title: `Education ${count}` };
        break;
      case 'project':
        newForm = { ...emptyProject, id: uuidv4(), title: `Project ${count}` };
        break;
      case 'skills':
        newForm = { ...emptySkills, id: uuidv4(), title: `Skills ${count}` };
        break;
      default:
        newForm = { ...emptyCustom, id: uuidv4(), title: `Custom Section ${count}` };
    }
    
    dispatch(
      addForm({
        formHolderId: formHolder.id,
        form: newForm,
      })
    );

    dispatch(      
      setSelectedForm({
        formHolderId: formHolder.id,
        form: newForm
    }))

  };


  // Apply styles for dragging
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 40 : 1
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-3 rounded-md bg-white shadow transition-opacity duration-200"
    >
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
            value={formHolderTitle}
            iconValue={formHolderIcon}
            onChange={handleTitleChange}
            onIconChange={handleIconChange}
            placeholder="Custom Form"
          />
        ) : (
          <div className="w-full flex items-center p-2 cursor-pointer" onClick={handleToggle} >
            <span className="mr-2">
              {iconOptions.find((icon) => icon.name === formHolderIcon)?.icon}
            </span>
            <div className="ml-2">{formHolderTitle}</div>
          </div>
        )}
        {isExpanded ? (
          <ChevronDown onClick={handleToggle} size={32} />
        ) : (
          <ChevronLeft onClick={handleToggle} size={32} />
        )}
      </div>

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
              <Form key={form.id} formHolderId={formHolder.id} form={form}/>
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex justify-center items-center border-t-2 border-neutral-300 py-4 w-full">
          <div
            className="flex flex-row gap-2 rounded-full border-1 p-2 border-gray-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer pr-5 ml-auto"
            onClick={addNewForm}
          >
            <Plus />
            {formHolder.type[0].toUpperCase() + formHolder.type.slice(1)}
          </div>
          <div className="ml-auto cursor-pointer" onClick={() => setActivePopover("DeleteFormHolder")}>
            <Trash2 className="text-red-600"/>
          </div>
        </div>
      </div>

      <PopoverDirector activePopover={activePopover}  popoverData={formHolder.id} onClose={() => setActivePopover(null)} />
    </div>
  );
}
