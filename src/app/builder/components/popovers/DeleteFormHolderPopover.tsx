"use client";

import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormHolder } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";


interface AddFormHolderPopoverProps {
  formHolderId: string;
  onClose: () => void;
}

export default function DeleteFormHolderPopover({formHolderId, onClose }: AddFormHolderPopoverProps) {
  const dispatch = useDispatch();
  const cvId = useSelector((state: RootState) => state.forms.cvId);
  const { deleteFormHolder: deleteFormHolderAPI } = useFormHolders(cvId);
  
  const handleDeleteFormHolder = async () => {
    await deleteFormHolderAPI(formHolderId);
    dispatch(deleteFormHolder(formHolderId));
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium mb-5">
            Are you sure you want to delete this data?
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-row justify-around">
          <button className="bg-orange-700 text-white rounded-lg p-2 shadow px-4 py-2 cursor-pointer" onClick={handleDeleteFormHolder}> Yes </button>
          <button className="bg-white text-black rounded-lg p-2 border border-black shadow px-4 py-2 cursor-pointer" onClick={() => onClose()}> No </button>
        </div>
      </div>
    </div>
  );
}