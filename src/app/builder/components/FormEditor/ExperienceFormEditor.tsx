'use client'
import { ResumeExperience } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function ExperienceFormEditor({ formData, handleChange }: BaseEditorProps<ResumeExperience>) {
  const [techInput, setTechInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

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

  const handleAchievementAdd = () => {
    if (achievementInput.trim()) {
      handleChange('achievements', JSON.stringify([...(formData.achievements || []), achievementInput.trim()]));
      setAchievementInput("");
    }
  };

  const handleAchievementRemove = (index: number) => {
    const achievements = [...(formData.achievements || [])];
    achievements.splice(index, 1);
    handleChange('achievements', JSON.stringify(achievements));
  };

  const technologies = formData.technologies || [];
  const achievements = formData.achievements || [];

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
        <select
          value={formData.employmentType || ''}
          onChange={(e) => handleChange('employmentType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Employment Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isCurrentRole || false}
          onChange={(e) => handleChange('isCurrentRole', e.target.checked.toString())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">I currently work here</label>
      </div>
      
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex-3/12 mr-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="text"
            value={formData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Jan 2020"
          />
        </div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="text"
            value={formData.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.isCurrentRole}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={formData.isCurrentRole ? 'Present' : 'Dec 2023'}
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
            placeholder="City, State/Country"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTechAdd())}
            placeholder="Add technology (e.g., React, Python)"
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
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tech}
              <button type="button" onClick={() => handleTechRemove(index)} className="hover:text-blue-600">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAchievementAdd())}
            placeholder="Add achievement (e.g., Increased sales by 20%)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAchievementAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
          </button>
        </div>
        <ul className="space-y-1">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md">
              <span className="text-sm">{achievement}</span>
              <button type="button" onClick={() => handleAchievementRemove(index)} className="text-red-500 hover:text-red-700">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
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