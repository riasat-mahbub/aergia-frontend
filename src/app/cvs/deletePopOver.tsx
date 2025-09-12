"use client"

import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { Check, Trash2, X } from "lucide-react";
import { useState } from "react"
import { CV } from "@/types/CvTypes";

interface popOverProps{
    id: string,
    closePopOver: () => void,
    removeCv: (id: string) => void
}

export default function DeletePopOver({id, closePopOver, removeCv}:popOverProps){
    const { execute, loading, error } = useApi();
    
    const handleDeleteCV = async () => {
        const result = await execute(() => apiService.cvs.delete(id));
        if(result){
            removeCv(result.id);
            closePopOver();
        }
    };



    return(
        <div className="flex flex-col fixed inset-0 backdrop-blur-sm items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div className="text-16 font-bold">
                        Delete this CV?
                    </div>

                    <X className='cursor-pointer ml-4' onClick={closePopOver}/>
                    
                </div>
                
 

                <div className="flex flex-row justify-between mt-10 w-full">
                    <button className="bg-red-500 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700" onClick={handleDeleteCV} disabled={loading}> <Check/> </button>
                    <button className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700" onClick={closePopOver} disabled={loading}> <X/> </button>
                </div>
            </div>
            
        </div>
    )
}