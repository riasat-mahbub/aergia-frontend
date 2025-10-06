"use client"

import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface popOverProps{
    id: string,
    closePopOver: () => void,
    removeCv: (id: string) => void
}

export default function DeletePopOver({id, closePopOver, removeCv}:popOverProps){
    const { execute, loading, error } = useApi();
    const router = useRouter();
    
    const handleDeleteCV = async () => {
        if (loading) return;

        if(error){
            router.replace('/error')
        }
        
        const result = await execute(() => apiService.cvs.delete(id));
        if(result){
            removeCv(id);
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

                    <X className={`cursor-pointer ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={loading ? undefined : closePopOver}/>
                    
                </div>
                
 

                <div className="flex flex-row justify-between mt-10 w-full">
                    <button 
                        className="bg-red-500 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={handleDeleteCV} 
                        disabled={loading}
                    > 
                        {loading ? 'Deleting...' : <Check/>} 
                    </button>
                    <button 
                        className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700 disabled:opacity-50" 
                        onClick={closePopOver} 
                        disabled={loading}
                    > 
                        <X/> 
                    </button>
                </div>
            </div>
            
        </div>
    )
}