'use client'
import { ResumeProject } from "@/types/ResumeFormTypes";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

interface ProjectFormEditorProps {
  formData: ResumeProject;
  onSave?: () => void;
  handleChange: (field: keyof ResumeProject, value:string) => void;
  onCancel?: () => void;
}

export default function ProjectFormEditor({ formData, onSave, onCancel, handleChange }: ProjectFormEditorProps) {

  return (
    <div className="rounded-md bg-white shadow p-6">
      
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-row flex-wrap justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="text"
              value={formData.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="text"
              value={formData.endDate || ''}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
          onClick={onSave}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}