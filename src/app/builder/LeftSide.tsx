"use client"

import { Plus } from "lucide-react";
import FormCollection from "./components/FormCollection";
import FormEditor from "./components/FormEditor/FormEditor";
import AddFormHolderPopover from "./components/AddFormHolderPopover";
import { useState } from "react";
import { ResumeForm } from "@/types/ResumeFormTypes";

export default function LeftSide(){
    const [showPopover, setShowPopover] = useState(false);
    const [selectedForm, setSelectedForm] = useState<{formHolderId: string, form: ResumeForm} | null>(null);
    
    const handleFormClick = (formHolderId: string, form: ResumeForm) => {
        setSelectedForm({formHolderId, form});
    };
    
    const handleBackToCollection = () => {
        setSelectedForm(null);
    };
    
    return(
        <div className="lg:w-5/12 w-full flex flex-col items-center">
            {selectedForm ? (
                <FormEditor 
                    form={selectedForm.form} 
                    formHolderId={selectedForm.formHolderId}
                    onBack={handleBackToCollection}
                />
            ) : (
                <>
                    <FormCollection onFormClick={handleFormClick}/>
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