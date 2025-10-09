"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CV } from "@/types/CvTypes";
import { useCVs } from "@/hooks/useCVs";

interface EditPopOverProps {
  cv: CV;
  closePopOver: () => void;
}

const templates = [
  { value: "MIT", label: "MIT Template" },
  { value: "Harvard", label: "Harvard Template" },
  { value: "Stanford", label: "Stanford Template" },
];

export default function EditPopOver({ cv, closePopOver }: EditPopOverProps) {
  const [title, setTitle] = useState(cv.title);
  const [template, setTemplate] = useState(cv.template);
  const [saving, setSaving] = useState(false);

  const { updateCv } = useCVs();

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    try {
      await updateCv(cv.id, {
        title: title.trim(),
        template,
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
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={saving}
            >
              {templates.map((tmpl) => (
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
