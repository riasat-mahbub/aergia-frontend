import { ResumeForm } from '@/types/ResumeFormTypes';
import { getEntryDisplayTitle, getEntrySubtitle } from '@/utils/formUtils';
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EntryCardProps {
  entry: ResumeForm;
  onEdit: (entry: ResumeForm) => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
}

export default function EntryCard({ entry, onEdit, onToggleVisibility, onDelete }: EntryCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const title = getEntryDisplayTitle(entry);
  const subtitle = getEntrySubtitle(entry);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors ${!entry.visible ? 'opacity-50' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={18} />
      </button>

      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => onEdit(entry)}
      >
        <p className="font-medium text-gray-900 truncate">{title}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          title={entry.visible ? 'Hide' : 'Show'}
        >
          {entry.visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
