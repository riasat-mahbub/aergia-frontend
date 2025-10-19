'use client'
import { ProfileItem, ResumeProfile, ResumeURL } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import IconPicker from "@/components/IconPicker";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import InfoItemEditor from "./InfoItemEditor";

interface ProfileFormEditorProps extends BaseEditorProps<ResumeProfile> {
  handleUrl: (url: ResumeURL, operation: "add" | "remove" | "change", index?: number) => void;
  handleProfileItem: (item: ProfileItem) => void;
}

export default function ProfileFormEditor({ formData, handleChange, handleUrl, handleProfileItem }: ProfileFormEditorProps) {

  const makeInitial = useCallback(() => {
    const arr = [
      { ...formData.email },
      { ...formData.phone },
      { ...formData.location }
    ];
    return arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [formData.email, formData.phone, formData.location]) 

  const [infoArray, setInfoArray] = useState<ProfileItem[]>(makeInitial);

  useEffect(() => {
    setInfoArray(makeInitial());
  }, [formData.email, formData.phone, formData.location, makeInitial]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const syncAllToParent = (arr: ProfileItem[]) => {
    arr.forEach(item => {
      handleProfileItem({ ...item });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = String(active.id);
    const overType = String(over.id);

    const updated = [...infoArray];
    const fromIndex = updated.findIndex(i => i.type === activeType);
    const toIndex = updated.findIndex(i => i.type === overType);

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    const withOrders = updated.map((item, idx) => ({ ...item, order: idx }));

    setInfoArray(withOrders);
    syncAllToParent(withOrders);

  };


  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
     
        <SortableContext items={infoArray.map(item => item.type)} strategy={verticalListSortingStrategy}>
          {infoArray.map((item, idx) => (
            <InfoItemEditor key={item.type} idx={idx} id={item.type} item={item} handleProfileItem={handleProfileItem}/>
          ))}
        </SortableContext>
      </DndContext>

      {/* URLs Section */}
      <div className="space-y-6">
        {formData.urls.map((url, idx) => (
          <div
            key={idx}
            className="p-4 md:p-5 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-wrap justify-between items-center mb-3 gap-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <IconPicker
                  selectedIcon={url.icon}
                  onIconChange={(selectedIcon) => handleUrl({ ...url, ['icon']: selectedIcon }, 'change', idx)}
                />
                <span className="text-sm md:text-md lg:text-xl">Website {idx + 1}</span>
              </h3>
              <button
                type="button"
                onClick={() => handleUrl(url, 'remove', idx)}
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Remove this website"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={url.url || ''}
                  onChange={(e) => handleUrl({ ...url, ['url']: e.target.value }, 'change', idx)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Website Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website Name
                </label>
                <input
                  type="text"
                  value={url.title || ''}
                  onChange={(e) => handleUrl({ ...url, ['title']: e.target.value }, 'change', idx)}
                  placeholder="e.g., Personal Portfolio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Website Button */}
      <div className="flex justify-center sm:justify-end mt-4">
        <button
          type="button"
          onClick={() => handleUrl({ title: '', url: '', icon: '', order: formData.urls.length, type: 'url' }, 'add')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md transition-all duration-300"
        >
          <Plus size={18} />
          Add Website
        </button>
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <RichTextEditor
          content={formData.summary || ''}
          onChange={(html) => handleChange('summary', html)}
        />
      </div>
    </div>
  );
}
