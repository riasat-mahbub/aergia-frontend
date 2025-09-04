'use client'
import { ResumeSkills } from "@/types/ResumeFormTypes";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

interface SkillsFormEditorProps {
  form: ResumeSkills;
  onSave: (updatedForm: ResumeSkills) => void;
  onCancel?: () => void;
}

export default function SkillsFormEditor({ form, onSave, onCancel }: SkillsFormEditorProps) {
  const [formData, setFormData] = useState(form);
  
  const handleChange = (field: keyof ResumeSkills, value: string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSkillsChange = (skills: any[]) => {
    setFormData({ ...formData, featuredSkills: skills });
  };
  
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="rounded-md bg-white shadow p-6">
      <h2 className="font-bold text-lg mb-4">Skills</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Skills</label>
          <textarea
            value={formData.featuredSkills?.map(skill => `${skill.skill}:${skill.rating}`).join('\n') || ''}
            onChange={(e) => {
              const skills = e.target.value.split('\n').map(line => {
                const [skill, rating] = line.split(':');
                return { skill: skill || '', rating: parseInt(rating) || 1, id: '', type: 'skill', title: '', visible: true };
              });
              handleSkillsChange(skills);
            }}
            rows={6}
            placeholder="Enter skills in format: Skill Name:Rating (1-5)\nExample:\nJavaScript:4\nReact:5"
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