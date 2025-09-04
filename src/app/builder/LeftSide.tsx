"use client"

import { Plus } from "lucide-react";
import FormCollection from "./components/FormCollection";
import FormEditor from "./components/FormEditor/FormEditor";
import AddFormHolderPopover from "./components/AddFormHolderPopover";
import { useState } from "react";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function LeftSide(){
    const [showPopover, setShowPopover] = useState(false);
    const selectedForm = useSelector((state: RootState) => state.forms.selectedForm);
    
    return(
        <div className="lg:w-5/12 w-full flex flex-col items-center">
            {selectedForm ? (
                <FormEditor 
                    form={selectedForm.form} 
                    formHolderId={selectedForm.formHolderId}
                />
            ) : (
                <>
                    <FormCollection/>
                    <div 
                        className="rounded-full text-white bg-emerald-500 flex mt-6 max-w-40 p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => setShowPopover(true)}
                    >
                        <Plus/>
                        Add Content
                    </div>
                    
                    {/* Popover Menu */}
                    {showPopover && <AddFormHolderPopover onClose={() => setShowPopover(false)} />}
                </>
            )}
        </div>
    )
}