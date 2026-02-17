'use client'
import { ResumeSkills } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function SkillsFormEditor({ formData, handleChange }: BaseEditorProps<ResumeSkills>) {
  const [skillInput, setSkillInput] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      handleChange('skills', JSON.stringify([...(formData.skills || []), skillInput.trim()]));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (index: number) => {
    const skills = [...(formData.skills || [])];
    skills.splice(index, 1);
    handleChange('skills', JSON.stringify(skills));
  };

  const skills = formData.skills || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={formData.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Programming Languages">Programming Languages</option>
          <option value="Frameworks & Libraries">Frameworks & Libraries</option>
          <option value="Tools & Software">Tools & Software</option>
          <option value="Databases">Databases</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
          <option value="Soft Skills">Soft Skills</option>
          <option value="Languages">Languages</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          value={formData.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          placeholder="Or enter custom category"
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
            placeholder="Add a skill (e.g., JavaScript, Python, Project Management)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
              {skill}
              <button type="button" onClick={() => handleSkillRemove(index)} className="hover:text-emerald-600">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-2">No skills added yet. Start typing and press Enter or click the + button to add skills.</p>
        )}
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