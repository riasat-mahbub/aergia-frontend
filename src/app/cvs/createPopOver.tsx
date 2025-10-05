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
    const [template, setTemplate] = useState('MIT');
    const { execute, loading, error } = useApi();
    
    const handleCreateCV = async () => {
        if (loading || !title.trim()) return;
        
        const result = await execute(() => apiService.cvs.create({title: title, template: template}));
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

                    <X className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={loading ? undefined : closePopOver}/>
                    
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
                    />

                    <div className="flex flex-row justify-between mt-10">
                        <button 
                            className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700 ml-auto disabled:opacity-50 disabled:cursor-not-allowed" 
                            onClick={handleCreateCV} 
                            disabled={loading || !title.trim()}
                        > 
                            {loading ? 'Creating...' : 'Create'} 
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}