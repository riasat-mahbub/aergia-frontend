'use client'
import { ResumeWorkExperience } from "@/types/ResumeFormTypes";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

interface WorkExperienceFormEditorProps {
  form: ResumeWorkExperience;
  onSave: (updatedForm: ResumeWorkExperience) => void;
  onCancel?: () => void;
}

export default function WorkExperienceFormEditor({ form, onSave, onCancel }: WorkExperienceFormEditorProps) {
  const [formData, setFormData] = useState(form);
  
  const handleChange = (field: keyof ResumeWorkExperience, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="rounded-md bg-white shadow p-6">
      <h2 className="font-bold text-lg mb-4">Work Experience</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={formData.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={formData.jobTitle || ''}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="text"
            value={formData.date || ''}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descriptions</label>
          <RichTextEditor 
            content={formData.description} 
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