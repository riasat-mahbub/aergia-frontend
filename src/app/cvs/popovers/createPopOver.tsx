"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { TEMPLATES, DEFAULT_TEMPLATE } from "@/constants/templates";
import { RootState } from "@/store/store";
import { setSelectedCvTemplate } from "@/store/cvsSlice";
import { CV } from "@/types/CvTypes";

interface PopOverProps {
  closePopOver: () => void;
  createCv: (title: string, template: string) => Promise<CV>;
}

export default function CreatePopOver({ closePopOver, createCv }: PopOverProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  
  const selectedTemplate = useSelector((state: RootState) => state.cv.selectedCvTemplate) || DEFAULT_TEMPLATE;
  
  const handleTemplateChange = (template: string) => {
    dispatch(setSelectedCvTemplate(template));
  };

  const handleCreateCV = async () => {
    if (!title.trim() || loading) return;

    setLoading(true);
    try {
      const newCv = await createCv(title, selectedTemplate);
      if (newCv) closePopOver();
    } catch (err) {
      console.error("Error creating CV:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col fixed inset-0 backdrop-blur-sm items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="text-16 font-bold">Create a new CV</div>
          <X
            className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={loading ? undefined : closePopOver}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
            >
              {TEMPLATES.map((tmpl) => (
                <option key={tmpl.value} value={tmpl.value}>
                  {tmpl.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button
              className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCreateCV}
              disabled={loading || !title.trim()}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
