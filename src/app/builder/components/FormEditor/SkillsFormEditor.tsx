'use client'
import { ResumeSkills } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";

export default function SkillsFormEditor({ formData, handleChange }: BaseEditorProps<ResumeSkills>) {

  return (

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
        <input
          type="text"
          value={formData.skill || ''}
          onChange={(e) => handleChange('skill', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <select
          value={formData.rating || ""}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            -- Select Rating --
          </option>
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
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