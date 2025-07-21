"use client";

import { Plus } from "lucide-react";
import FormCollection from "./FormCollection";
import { useState } from "react";
import AddFormHolderPopover from "./components/AddFormHolderPopover";
import FormToPDF from "./components/FormToPDF";

export default function Builder(){
    const [showPopover, setShowPopover] = useState(false);
    
    return(
        <div className="flex lg:flex-row flex-col">
            <div className="lg:w-5/12 w-full flex flex-col items-center">
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
                
            </div>

            <div className="lg:w-7/12 w-full flex flex-col items-center p-6">
                <FormToPDF />
            </div>

        </div>
    )
}