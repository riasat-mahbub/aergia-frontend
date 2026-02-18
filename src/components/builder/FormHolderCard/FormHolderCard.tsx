import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Eye, EyeOff, Settings } from "lucide-react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFormHolderToShow, setSelectedForm } from "@/store/formSlice";
import { FormHolder } from "@/types/FormHolderTypes";

interface FormHolderCardProps {
  formHolder: FormHolder;
  onDelete: (formHolderId: string) => void;
}

export default function FormHolderCard({ formHolder, onDelete }: FormHolderCardProps) {
  const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: formHolder.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
    willChange: "transform",
  };

  const handleToggleVisibility = () => {
    dispatch(setFormHolderToShow(formHolder.id));
  };

  const handleEdit = () => {
    if (formHolder.data.length > 0) {
      dispatch(setSelectedForm({
        formHolderId: formHolder.id,
        form: formHolder.data[0]
      }));
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* <IconOptions icon={formHolder.icon} /> */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-800">
              {formHolder.title}
            </h3>
            <span className="text-xs text-gray-500 capitalize">
              {formHolder.type}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleVisibility();
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-600 transition"
            title={formHolder.visible ? "Hide" : "Show"}
          >
            {formHolder.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
            title="Edit"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(formHolder.id);
            }}
            className="p-1 rounded hover:bg-red-100 text-red-600 transition"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        {formHolder.data.length} item{formHolder.data.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
