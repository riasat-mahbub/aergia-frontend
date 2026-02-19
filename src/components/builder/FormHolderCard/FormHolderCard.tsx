import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Eye, EyeOff, Settings, GripVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFormHolderToShow, setSelectedForm, setSelectedSection } from "@/store/formSlice";
import { FormHolder } from "@/types/FormHolderTypes";
import { RootState } from "@/store/store";

interface FormHolderCardProps {
  formHolder: FormHolder;
  onDelete: (formHolderId: string) => void;
}

export default function FormHolderCard({ formHolder, onDelete }: FormHolderCardProps) {
  const dispatch = useDispatch();
  const selectedSectionId = useSelector((state: RootState) => state.forms.selectedSectionId);
  const isSelected = selectedSectionId === formHolder.id;

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

  const handleCardClick = () => {
    dispatch(setSelectedSection(formHolder.id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-white shadow-sm hover:shadow-md transition-all duration-200 ${
        isSelected ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200'
      } ${isDragging ? 'cursor-grabbing' : ''}`}
    >
      <div className="flex items-start p-4">
        <button
          {...attributes}
          {...listeners}
          className="p-1 mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 rounded"
        >
          <GripVertical size={18} />
        </button>

        <div
          className="flex-1 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800">
                  {formHolder.title}
                </h3>
                <span className="text-xs text-gray-500 capitalize">
                  {formHolder.type}
                </span>
              </div>
            </div>

            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleToggleVisibility}
                className="p-1 rounded hover:bg-gray-100 text-gray-600 transition"
                title={formHolder.visible ? "Hide" : "Show"}
              >
                {formHolder.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={handleEdit}
                className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
                title="Edit first entry"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => onDelete(formHolder.id)}
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
      </div>
    </div>
  );
}
