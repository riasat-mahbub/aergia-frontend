"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { CV } from "@/types/CvTypes";
import { useCVs } from "@/hooks/useCVs";
import { TEMPLATES } from "@/constants/templates";
import { RootState } from "@/store/store";
import { setSelectedCvTemplate } from "@/store/cvsSlice";

interface EditPopOverProps {
  cv: CV;
  closePopOver: () => void;
}

export default function EditPopOver({ cv, closePopOver }: EditPopOverProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(cv.title);
  const [saving, setSaving] = useState(false);

  const { updateCv } = useCVs();
  const selectedTemplate = useSelector((state: RootState) => state.cv.selectedCvTemplate) || cv.template;
  
  const handleTemplateChange = (template: string) => {
    dispatch(setSelectedCvTemplate(template));
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    try {
      await updateCv(cv.id, {
        title: title.trim(),
        template: selectedTemplate,
        order: cv.order,
      });

      closePopOver();
    } catch (error) {
      console.error("Failed to update CV:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit CV</h3>
          <button
            onClick={closePopOver}
            disabled={saving}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter CV title"
              disabled={saving}
            />
          </div>

          {/* Template Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={saving}
            >
              {TEMPLATES.map((tmpl) => (
                <option key={tmpl.value} value={tmpl.value}>
                  {tmpl.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={closePopOver}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
