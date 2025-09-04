'use client'
import { ResumeProject } from "@/types/ResumeFormTypes";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

interface ProjectFormEditorProps {
  form: ResumeProject;
  onSave: (updatedForm: ResumeProject) => void;
  onCancel?: () => void;
}

export default function ProjectFormEditor({ form, onSave, onCancel }: ProjectFormEditorProps) {
  const [formData, setFormData] = useState(form);
  
  const handleChange = (field: keyof ResumeProject, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="rounded-md bg-white shadow p-6">
      <h2 className="font-bold text-lg mb-4">Project</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            value={formData.project || ''}
            onChange={(e) => handleChange('project', e.target.value)}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Descriptions</label>
          <RichTextEditor 
            content={formData.description} 
            onChange={(html) => handleChange('description', html.split('<br>'))} 
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