'use client'
import { ResumeExperience } from "@/types/ResumeFormTypes";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

interface ExperienceFormEditorProps {
  formData: ResumeExperience;
  onSave?: () => void;
  handleChange: (field: keyof ResumeExperience, value:string) => void;
  onCancel?: () => void;
}

export default function ExperienceFormEditor({ formData, handleChange }: ExperienceFormEditorProps) {

  return (

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
        <label className="block text-sm font-medium text-gray-700 mb-1">Descriptions</label>
        <RichTextEditor 
          content={formData.description} 
          onChange={(html) => handleChange('description', html)} 
        />
      </div>
    </div>

  );
}