import { Plus } from "lucide-react";
import FormCollection from "./components/FormCollection";
import FormEditor from "./components/FormEditor/FormEditor";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import PopoverDirector from "./components/popovers/PopoverDirector";
import { popover } from "@/constants/popovers";


export default function LeftSide(){
    const [activePopover, setActivePopover] = useState<popover>(null);
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
                        onClick={() => setActivePopover("AddFormHolder")}
                    >
                        <Plus/>
                        Add Content
                    </div>
                    
                    {/* Popover Menu */}
                    <PopoverDirector activePopover={activePopover}  popoverData={null} onClose={() => setActivePopover(null)} />
                </>
            )}
        </div>
    )
}