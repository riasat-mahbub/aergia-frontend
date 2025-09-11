"use client"

import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { Check, Trash2, X } from "lucide-react";
import { useState } from "react"
import { CV } from "@/types/CvTypes";

interface popOverProps{
    closePopOver: () => void
    addCv: (cv: CV) => void
}

export default function CreatePopOver({closePopOver, addCv}:popOverProps){
    const [title, setTitle] = useState('');
    const { execute, loading, error } = useApi();
    
    const handleCreateCV = async () => {
        const result = await execute(() => apiService.cvs.create({title: title}));
        if(result){
            addCv(result.data);
            closePopOver();
        }
    };



    return(
        <div className="flex flex-col fixed inset-0 backdrop-blur-sm items-center justify-center z-50">
            <div className="bg-white p-10 rounded-lg">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div className="text-16 font-bold">
                        Create a new CV
                    </div>

                    <X className='cursor-pointer' onClick={closePopOver}/>
                    
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    />

                    <div className="flex flex-row justify-between mt-10">
                        <button className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700 ml-auto" onClick={handleCreateCV} disabled={loading}> Create </button>
                        {/* <button className="bg-red-500 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700" onClick={closePopOver} disabled={loading}> <Trash2/> </button> */}
                    </div>
                </div>
            </div>
            
        </div>
    )
}