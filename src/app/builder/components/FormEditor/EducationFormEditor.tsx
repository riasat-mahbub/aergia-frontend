'use client'
import { ResumeEducation } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function EducationFormEditor({ formData, handleChange }: BaseEditorProps<ResumeEducation>) {
  const [honorInput, setHonorInput] = useState("");

  const handleHonorAdd = () => {
    if (honorInput.trim()) {
      handleChange('honors', JSON.stringify([...(formData.honors || []), honorInput.trim()]));
      setHonorInput("");
    }
  };

  const handleHonorRemove = (index: number) => {
    const honors = [...(formData.honors || [])];
    honors.splice(index, 1);
    handleChange('honors', JSON.stringify(honors));
  };

  const honors = formData.honors || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
        <input
          type="text"
          value={formData.school || ''}
          onChange={(e) => handleChange('school', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
        <input
          type="text"
          value={formData.degree || ''}
          onChange={(e) => handleChange('degree', e.target.value)}
          placeholder="e.g., Bachelor of Science, Master of Arts"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
        <input
          type="text"
          value={formData.fieldOfStudy || ''}
          onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
          placeholder="e.g., Computer Science, Business Administration"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isCurrentlyStudying || false}
          onChange={(e) => handleChange('isCurrentlyStudying', e.target.checked.toString())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">I am currently studying here</label>
      </div>
      
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex-3/12 mr-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="text"
            value={formData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            placeholder="Sep 2018"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="text"
            value={formData.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.isCurrentlyStudying}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={formData.isCurrentlyStudying ? 'Present' : 'Jun 2022'}
          />
        </div>

        <div className="flex-1/12"></div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State/Country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
        <input
          type="text"
          value={formData.gpa || ''}
          onChange={(e) => handleChange('gpa', e.target.value)}
          placeholder="e.g., 3.8/4.0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Honors & Awards</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={honorInput}
            onChange={(e) => setHonorInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleHonorAdd())}
            placeholder="Add honor (e.g., Dean's List, Summa Cum Laude)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleHonorAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {honors.map((honor, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {honor}
              <button type="button" onClick={() => handleHonorRemove(index)} className="hover:text-purple-600">
                <X size={14} />
              </button>
            </span>
          ))}
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
  );
}