'use client'
import { ResumeLanguage } from "@/types/ResumeFormTypes";
import { BaseEditorProps } from "./FormEditor";

export default function LanguageFormEditor({ formData, handleChange }: BaseEditorProps<ResumeLanguage>) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <input
          type="text"
          value={formData.language || ''}
          onChange={(e) => handleChange('language', e.target.value)}
          placeholder="e.g., Spanish, French, Mandarin"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
        <select
          value={formData.proficiency || 'Basic'}
          onChange={(e) => handleChange('proficiency', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Native">Native - Native or bilingual proficiency</option>
          <option value="Fluent">Fluent - Full professional proficiency</option>
          <option value="Advanced">Advanced - Professional working proficiency</option>
          <option value="Intermediate">Intermediate - Limited working proficiency</option>
          <option value="Basic">Basic - Elementary proficiency</option>
        </select>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Proficiency Levels Guide:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Native:</strong> Native or bilingual proficiency</li>
          <li><strong>Fluent:</strong> Can negotiate contracts and discuss complex topics</li>
          <li><strong>Advanced:</strong> Can handle work tasks in the language</li>
          <li><strong>Intermediate:</strong> Can handle routine work interactions</li>
          <li><strong>Basic:</strong> Can understand simple phrases and expressions</li>
        </ul>
      </div>
    </div>
  );
}