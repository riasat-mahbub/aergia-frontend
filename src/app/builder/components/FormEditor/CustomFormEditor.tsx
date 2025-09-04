'use client'
import { ResumeCustom } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { useState } from "react";

interface CustomFormEditorProps {
  form: ResumeCustom;
  onSave: (updatedForm: ResumeCustom) => void;
  onCancel?: () => void;
}

export default function CustomFormEditor({ form, onSave, onCancel }: CustomFormEditorProps) {
  const [formData, setFormData] = useState(form);
  
  const handleDescriptionChange = (html: string) => {
    setFormData({
      ...formData,
      description: html
    });
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title: title
    });
  };
  
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="rounded-md bg-white shadow p-6">
      <h2 className="font-bold text-lg mb-4">Custom Section</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <RichTextEditor 
            content={formData.description || ''} 
            onChange={handleDescriptionChange} 
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}