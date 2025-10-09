"use client";

import { CV } from "@/types/CvTypes";
import { useSortable } from "@dnd-kit/sortable";
import { Trash2, Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface CVCardProps {
  cv: CV;
  openDeletePopOver: () => void;
  openEditPopOver: () => void;
}

export function CVCard({ cv, openDeletePopOver, openEditPopOver }: CVCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: cv.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
    willChange: "transform",
  };

  const getTemplateImage = (template: string) => {
    const images = {
      MIT: '/images/MIT.png',
      Harvard: '/images/Harvard.jpg'
    };
    return images[template as keyof typeof images] || '/images/templates/default-demo.png';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-transform duration-200 w-64 h-64 flex flex-col justify-start p-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Title + Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {cv.title}
          </h3>
          <span className="text-sm text-gray-500">{cv.template} Template</span>
        </div>

        <div className="flex gap-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditPopOver();
            }}
            className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDeletePopOver();
            }}
            className="p-1 rounded hover:bg-red-100 text-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Template Preview Image */}
      <div 
        className="flex-1 relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/builder/?cvId=${cv.id}&cvTemplate=${cv.template}`);
        }}
      >
        <img 
          src={getTemplateImage(cv.template)}
          alt={`${cv.template} template preview`}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
        
        {/* Hover Overlay with Eye Icon */}
        {isHovered && (
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center transition-opacity duration-200">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Eye size={24} className="text-gray-700" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}