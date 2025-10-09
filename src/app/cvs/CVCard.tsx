"use client"

import { CV } from "@/types/CvTypes"
import { useSortable } from "@dnd-kit/sortable";
import { Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSS } from "@dnd-kit/utilities";

interface CVCardProps{
    cv: CV;
    openDeletePopOver: () => void;
    openEditPopOver: () => void;
}

export function CVCard({cv, openDeletePopOver, openEditPopOver}: CVCardProps){

    const router = useRouter();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: cv.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 1
    };
    
    return(
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div
                key={cv.id}
                className="border rounded-lg pr-6 shadow-md hover:shadow-lg flex flex-row justify-between items-center">
                <div className="text-black text-3xl mb-4 w-full cursor-pointer py-6 pl-6" onClick={() => router.push(`/builder/?cvId=${cv.id}&cvTemplate=${cv.template}`)}>
                    {cv.title}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => openEditPopOver()} className="hover:text-blue-700 text-blue-500 py-1 px-3 rounded text-sm">
                        <Edit />
                    </button>
                    <button onClick={() => openDeletePopOver()} className="hover:text-red-700 text-red-500 py-1 px-3 rounded text-sm">
                        <Trash2 />
                    </button>
                </div>
            </div>
        </div>
    )
}