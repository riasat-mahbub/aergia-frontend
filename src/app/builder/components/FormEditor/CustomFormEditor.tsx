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
  
  const handleChange = (field: keyof ResumeCustom, value: string) => {
    setFormData({ ...formData, [field]: value });
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
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex-3/12 mr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="text"
              value={formData.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>


          <div className="flex-3/12">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="text"
              value={formData.endDate || ''}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex-1/12"></div>

          <div className="flex-3/12">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <RichTextEditor 
            content={formData.description || ''} 
            onChange={(html) => handleChange('description', html)} 
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