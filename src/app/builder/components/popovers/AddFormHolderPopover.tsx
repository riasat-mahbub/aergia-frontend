"use client";

import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addFormHolder } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export const formHolderTypes = [
  { type: "profile", name: "Profile", icon: "Person" },
  { type: "experience", name: "Experience", icon: "Briefcase" },
  { type: "education", name: "Education", icon: "GraduationCap" },
  { type: "project", name: "Project", icon: "Folder" },
  { type: "skills", name: "Skills", icon: "Library" },
  { type: "custom", name: "Custom", icon: "Star" }
];

interface AddFormHolderPopoverProps {
  onClose: () => void;
}

export default function AddFormHolderPopover({ onClose }: AddFormHolderPopoverProps) {
  const dispatch = useDispatch();
  const { saveFormHolder } = useFormHolders();
  const [loading, setLoading] = useState(false);

  const cvTemplate = useSelector((state: RootState) => state.cv.selectedCvTemplate)
  
  const handleAddFormHolder = async (type: string) => {
    if (loading) return;
    
    const selectedType = formHolderTypes.find(t => t.type === type);
    if (!selectedType) return;
    
    setLoading(true);
    
    try {
      // First save to backend to get the ID
      const result = await saveFormHolder({
        id: '',
        title: selectedType.name,
        icon: selectedType.icon,
        type: selectedType.type,
        data: [],
        style: {},
        structure: {type:"Div"},
        visible: true,
        order: 0
      });
      
      // Then dispatch to Redux with the actual ID from backend
      if (result) {
        dispatch(addFormHolder({
          formHolderTitle: selectedType.name,
          formHolderIcon: selectedType.icon,
          formHolderType: selectedType.type,
          formHolderData: [],
        }));
      }
      
      // Add small delay to prevent rapid successive calls
      await new Promise(resolve => setTimeout(resolve, 100));
      
      onClose();
    } catch (error) {
      console.error('Failed to save FormHolder to backend:', error);
      // Don't close on error
    } finally {
      setLoading(false);
    }
  };
  
  if(loading){
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
          <Spinner/>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Content Type</h3>
          <button 
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {formHolderTypes.map((type, idx) => (
            <button
              key={idx}
              disabled={loading}
              className="p-3 border rounded-md hover:bg-emerald-50 hover:border-emerald-500 transition-colors flex flex-col items-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleAddFormHolder(type.type)}
            >
              <span className="text-sm font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}