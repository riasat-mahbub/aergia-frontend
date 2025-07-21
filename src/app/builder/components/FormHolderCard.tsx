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
  User
} from "lucide-react";
import Form from "./Form";
import { FormHolder } from "@/types/FormHolderTypes";
import { useDispatch } from "react-redux";
import { updateFormHolder } from "@/store/formSlice";

interface FormHolderOptions{
  formHolder: FormHolder;
}

export type IconOption = {
  name: string;
  icon: React.ReactNode;
};

export const iconOptions: IconOption[] = [
  { name: 'Email', icon: <Mail size={18} /> },
  { name: 'Phone', icon: <Phone size={18} /> },
  { name: 'Website', icon: <Globe size={18} /> },
  { name: 'Location', icon: <MapPin size={18} /> },
  { name: 'Work', icon: <Briefcase size={18} /> },
  { name: 'Education', icon: <GraduationCap size={18} /> },
  { name: 'Person', icon: <User size={18} /> },
];

export default function FormHolderCard({formHolder}: FormHolderOptions) {
  const [formHolderTitle, setformHolderTitle] = useState(formHolder.title);
  const [formHolderIcon, setformHolderIcon] = useState(formHolder.icon);
  const dispatch = useDispatch();

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  
  useEffect(() => {
    setformHolderTitle(formHolder.title);
    setformHolderIcon(formHolder.icon);
  }, [formHolder]);
  
  const handleTitleChange = (title: string) => {
    setformHolderTitle(title);
    dispatch(updateFormHolder({
      ...formHolder,
      title
    }));
  };
  
  const handleIconChange = (icon: string) => {
    setformHolderIcon(icon);
    dispatch(updateFormHolder({
      ...formHolder,
      icon
    }));
  };
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white shadow transition-opacity duration-200">
      <div className="flex flex-row items-center gap-4 pl-4 py-4 pr-3">
        {isExpanded?
        <IconInput
          value={formHolderTitle}
          iconValue={formHolderIcon}
          onChange={handleTitleChange}
          onIconChange={handleIconChange}
          placeholder="Custom Form"
        />:
        <div className="w-full flex items-center p-2">
          <span className="mr-2">
            {iconOptions.find(icon => icon.name === formHolderIcon)?.icon}
          </span>
          <div className="ml-2">
            {formHolderTitle}
          </div>
        </div>
        }
        {isExpanded ? (
          <ChevronDown {...getToggleProps()} size={32} />
        ) : (
          <ChevronLeft {...getToggleProps()} size={32} />
        )}
      </div>

      <div {...getCollapseProps()} className="flex flex-col mx-3">
        {formHolder.data.map((form) => (
          <Form key={formHolder.id} formHolderId={formHolder.id} form={form}/>
        ))}
      </div>
    </div>
  );
}
