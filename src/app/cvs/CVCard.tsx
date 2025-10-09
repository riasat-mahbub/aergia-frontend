"use client"

import { CV } from "@/types/CvTypes"
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CVCardProps{
    cv: CV;
    openDeletePopOver: () => void;
}

export function CVCard({cv, openDeletePopOver}: CVCardProps){

    const router = useRouter();
    
    return(
        <div
            key={cv.id}
            className="border rounded-lg pr-6 shadow-md hover:shadow-lg flex flex-row justify-between items-center">
            <div className="text-black text-3xl mb-4 w-full cursor-pointer py-6 pl-6" onClick={() => router.push(`/builder/?cvId=${cv.id}&cvTemplate=${cv.template}`)}>
              {cv.title}
            </div>
            <button onClick={() => openDeletePopOver()} className="hover:text-red-700 text-red-500 py-1 px-3 rounded text-sm">
                <Trash2 />
            </button>
        </div>
    )
}