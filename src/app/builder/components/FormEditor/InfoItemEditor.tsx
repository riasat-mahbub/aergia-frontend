'use client'
import { ProfileItem } from "@/types/ResumeFormTypes";
import IconPicker from "@/components/IconPicker";
import { Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface InfoItemEditorProps {
  item: ProfileItem;
  idx: number;
  id: string;
  handleProfileItem: (item: ProfileItem) => void;
  onRemove: (index: number) => void;
}

export default function InfoItemEditor({ item, idx, id, handleProfileItem, onRemove }: InfoItemEditorProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleChange = (field: keyof ProfileItem, value: string | number) => {
    handleProfileItem({ ...item, [field]: value });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab hover:cursor-grabbing">
            <GripVertical size={16} className="text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-800">Contact Info {idx + 1}</h3>
        </div>
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
          <IconPicker
            selectedIcon={item.icon}
            onIconChange={(icon) => handleChange('icon', icon)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
          <input
            type="text"
            value={item.type || ''}
            onChange={(e) => handleChange('type', e.target.value)}
            placeholder="e.g., email, phone"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., john@example.com"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}