import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedSection,
  setSelectedForm,
  updateFormHolder,
  deleteForm,
  setFormToShow,
  addForm,
  getSelectedSection,
} from '@/store/formSlice';
import { getEmptyFormByType, getFormTypeLabel } from '@/utils/formUtils';
import { ResumeForm } from '@/types/ResumeFormTypes';
import EntryCard from './EntryCard';
import SectionStyleEditor from './SectionStyleEditor';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ChevronLeft, Plus, Edit3, Palette } from 'lucide-react';

export default function SectionEditor() {
  const dispatch = useDispatch();
  const formHolder = useSelector(getSelectedSection);
  const [activeTab, setActiveTab] = useState<'entries' | 'style'>('entries');
  const [localTitle, setLocalTitle] = useState(formHolder?.title || '');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!formHolder) {
    return (
      <div className="w-full p-4">
        <p className="text-gray-500">Section not found</p>
      </div>
    );
  }

  const handleBack = () => {
    dispatch(setSelectedSection(null));
  };

  const handleTitleChange = (newTitle: string) => {
    setLocalTitle(newTitle);
  };

  const handleTitleSave = () => {
    if (localTitle !== formHolder.title) {
      dispatch(
        updateFormHolder({
          ...formHolder,
          title: localTitle,
        })
      );
    }
  };

  const handleEditEntry = (entry: ResumeForm) => {
    dispatch(setSelectedForm({ formHolderId: formHolder.id, form: entry }));
  };

  const handleToggleVisibility = (entry: ResumeForm) => {
    dispatch(setFormToShow({ formHolderId: formHolder.id, formId: entry.id }));
  };

  const handleDeleteEntry = (entry: ResumeForm) => {
    dispatch(deleteForm({ formHolderId: formHolder.id, formId: entry.id }));
  };

  const handleAddEntry = () => {
    const newForm = getEmptyFormByType(formHolder.type);
    dispatch(addForm({ formHolderId: formHolder.id, form: newForm }));
    dispatch(setSelectedForm({ formHolderId: formHolder.id, form: newForm }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formHolder.data.findIndex((item) => item.id === String(active.id));
      const newIndex = formHolder.data.findIndex((item) => item.id === String(over.id));
      const newData = arrayMove(formHolder.data, oldIndex, newIndex);
      dispatch(
        updateFormHolder({
          ...formHolder,
          data: newData,
        })
      );
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <input
            type="text"
            value={localTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
            className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-0"
          />
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
          {getFormTypeLabel(formHolder.type)}
        </span>
      </div>

      <div className="flex gap-2 p-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('entries')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeTab === 'entries'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Edit3 size={16} />
          Entries
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeTab === 'style'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Palette size={16} />
          Style
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'entries' && (
          <div className="space-y-4">
            {formHolder.data.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No entries yet</p>
                <button
                  onClick={handleAddEntry}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <Plus size={18} />
                  Add Entry
                </button>
              </div>
            ) : (
              <>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={formHolder.data.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {formHolder.data.map((entry) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          onEdit={handleEditEntry}
                          onToggleVisibility={() => handleToggleVisibility(entry)}
                          onDelete={() => handleDeleteEntry(entry)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                <button
                  onClick={handleAddEntry}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                >
                  <Plus size={18} />
                  Add {getFormTypeLabel(formHolder.type)}
                </button>
              </>
            )}
          </div>
        )}

        {activeTab === 'style' && <SectionStyleEditor formHolder={formHolder} />}
      </div>
    </div>
  );
}
