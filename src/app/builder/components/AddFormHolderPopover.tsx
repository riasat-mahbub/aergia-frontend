"use client";

import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addFormHolder } from "@/store/formSlice";
import { createFormHolder } from "@/constants/formHolders";

// Define form holder types
export const formHolderTypes = [
  { id: "profile", name: "Profile", icon: "Person" },
  { id: "workExperience", name: "Work Experience", icon: "Briefcase" },
  { id: "education", name: "Education", icon: "GraduationCap" },
  { id: "project", name: "Project", icon: "Globe" },
  { id: "skills", name: "Skills", icon: "Star" },
  { id: "custom", name: "Custom", icon: "File" }
];

interface AddFormHolderPopoverProps {
  onClose: () => void;
}

export default function AddFormHolderPopover({ onClose }: AddFormHolderPopoverProps) {
  const dispatch = useDispatch();
  
  const handleAddFormHolder = (type: string) => {
    const selectedType = formHolderTypes.find(t => t.id === type);
    if (!selectedType) return;
    
    const newFormHolder = createFormHolder(
      selectedType.name,
      selectedType.icon,
      selectedType.id,
      []
    );
    
    dispatch(addFormHolder(newFormHolder));
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Content Type</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {formHolderTypes.map((type) => (
            <button
              key={type.id}
              className="p-3 border rounded-md hover:bg-emerald-50 hover:border-emerald-500 transition-colors flex flex-col items-center"
              onClick={() => handleAddFormHolder(type.id)}
            >
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}