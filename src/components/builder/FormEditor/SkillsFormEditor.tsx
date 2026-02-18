import { ResumeSkills } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import { Plus, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function SkillsFormEditor({ form, onChange }: FormEditorProps<ResumeSkills>) {
  const handleChange = (field: keyof ResumeSkills, value: string | string[]) => {
    onChange({ ...form, [field]: value });
  };

  const handleAddSkill = () => {
    const skills = [...(form.skills || []), ''];
    handleChange('skills', skills);
  };

  const handleUpdateSkill = (index: number, value: string) => {
    const skills = [...(form.skills || [])];
    skills[index] = value;
    handleChange('skills', skills);
  };

  const handleDeleteSkill = (index: number) => {
    const skills = form.skills?.filter((_, i) => i !== index) || [];
    handleChange('skills', skills);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    } else if (e.key === 'Backspace' && !form.skills?.[index] && form.skills?.length) {
      handleDeleteSkill(index);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Skills"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Programming Languages, Frameworks, Tools..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Skills</label>
          <button
            type="button"
            onClick={handleAddSkill}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            Add Skill
          </button>
        </div>

        <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[100px] bg-white">
          {form.skills?.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded"
            >
              <input
                type="text"
                value={skill}
                onChange={(e) => handleUpdateSkill(index, e.target.value)}
                onKeyDown={(e) => handleSkillKeyDown(e, index)}
                className="w-20 bg-transparent text-sm focus:outline-none"
                placeholder="Skill"
              />
              <button
                type="button"
                onClick={() => handleDeleteSkill(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {(!form.skills || form.skills.length === 0) && (
            <span className="text-gray-400 text-sm">Click "Add Skill" to add skills</span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Additional details about your skills..."
          minRows={2}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="visible"
          checked={form.visible}
          onChange={(e) => onChange({ ...form, visible: e.target.checked })}
          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
        />
        <label htmlFor="visible" className="text-sm text-gray-700">
          Visible on resume
        </label>
      </div>
    </div>
  );
}
