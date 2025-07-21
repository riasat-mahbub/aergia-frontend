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
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Plus,
} from "lucide-react";
import Form from "./Form";
import { FormHolder } from "@/types/FormHolderTypes";
import { useDispatch, useSelector } from "react-redux";
import { addForm, updateFormHolder } from "@/store/formSlice";
import { setExpandedFormHolder } from "@/store/settingSlice";
import { RootState } from "@/store/store";
import { 
  emptyCustom, 
  emptyProfile, 
  emptyWorkExperience, 
  emptyEducation, 
  emptyProject, 
  emptySkills 
} from "@/constants/resumeFormTemplates";
import { v4 as uuidv4 } from "uuid";

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
  { name: "Website", icon: <Globe size={18} /> },
  { name: "Location", icon: <MapPin size={18} /> },
  { name: "Work", icon: <Briefcase size={18} /> },
  { name: "Education", icon: <GraduationCap size={18} /> },
  { name: "Person", icon: <User size={18} /> },
];



export default function FormHolderCard({ formHolder }: FormHolderOptions) {
  const [formHolderTitle, setformHolderTitle] = useState(formHolder.title);
  const [formHolderIcon, setformHolderIcon] = useState(formHolder.icon);
  const dispatch = useDispatch();
  
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
  };
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white shadow transition-opacity duration-200">
      <div className="flex flex-row items-center gap-4 pl-4 py-4 pr-3">
        {isExpanded ? (
          <IconInput
            value={formHolderTitle}
            iconValue={formHolderIcon}
            onChange={handleTitleChange}
            onIconChange={handleIconChange}
            placeholder="Custom Form"
          />
        ) : (
          <div className="w-full flex items-center p-2">
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
        {formHolder.data.map((form) => (
          <Form key={form.id} formHolderId={formHolder.id} form={form} />
        ))}

        <div className="flex justify-center items-center border-t-2 border-neutral-300 py-4">
          <div
            className="flex flex-row gap-2 rounded-full border-2 p-2 border-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={addNewForm}
          >
            <Plus />
            {formHolder.type[0].toUpperCase() + formHolder.type.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
