'use client'
import { ResumeProject } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function ProjectFormEditor({ formData, handleChange }: BaseEditorProps<ResumeProject>) {
  const [techInput, setTechInput] = useState("");

  const handleTechAdd = () => {
    if (techInput.trim()) {
      handleChange('technologies', JSON.stringify([...(formData.technologies || []), techInput.trim()]));
      setTechInput("");
    }
  };

  const handleTechRemove = (index: number) => {
    const techs = [...(formData.technologies || [])];
    techs.splice(index, 1);
    handleChange('technologies', JSON.stringify(techs));
  };

  const technologies = formData.technologies || [];

  return (
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
          placeholder="Brief tagline or summary"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
        <input
          type="url"
          value={formData.projectUrl || ''}
          onChange={(e) => handleChange('projectUrl', e.target.value)}
          placeholder="https://github.com/username/project or live demo URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
        <input
          type="text"
          value={formData.role || ''}
          onChange={(e) => handleChange('role', e.target.value)}
          placeholder="e.g., Lead Developer, Designer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isOngoing || false}
          onChange={(e) => handleChange('isOngoing', e.target.checked.toString())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">This project is ongoing</label>
      </div>
      
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex-3/12 mr-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="text"
            value={formData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            placeholder="Jan 2023"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="text"
            value={formData.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.isOngoing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={formData.isOngoing ? 'Present' : 'Dec 2023'}
          />
        </div>

        <div className="flex-1/12"></div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Remote, City, or Online"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTechAdd())}
            placeholder="Add technology (e.g., React, Node.js)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleTechAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {tech}
              <button type="button" onClick={() => handleTechRemove(index)} className="hover:text-green-600">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <RichTextEditor 
          content={formData.description} 
          onChange={(html) => handleChange('description', html)} 
        />
      </div>
    </div>
  );
}