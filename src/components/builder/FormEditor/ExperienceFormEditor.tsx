import { ResumeExperience } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import { Plus, Trash2, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Temporary',
  'Self-employed',
];

export default function ExperienceFormEditor({ form, onChange }: FormEditorProps<ResumeExperience>) {
  const handleChange = (field: keyof ResumeExperience, value: string | boolean | string[]) => {
    onChange({ ...form, [field]: value });
  };

  const handleAddAchievement = () => {
    const achievements = [...(form.achievements || []), ''];
    handleChange('achievements', achievements);
  };

  const handleUpdateAchievement = (index: number, value: string) => {
    const achievements = [...(form.achievements || [])];
    achievements[index] = value;
    handleChange('achievements', achievements);
  };

  const handleDeleteAchievement = (index: number) => {
    const achievements = form.achievements?.filter((_, i) => i !== index) || [];
    handleChange('achievements', achievements);
  };

  const handleAddTechnology = () => {
    const technologies = [...(form.technologies || []), ''];
    handleChange('technologies', technologies);
  };

  const handleUpdateTechnology = (index: number, value: string) => {
    const technologies = [...(form.technologies || [])];
    technologies[index] = value;
    handleChange('technologies', technologies);
  };

  const handleDeleteTechnology = (index: number) => {
    const technologies = form.technologies?.filter((_, i) => i !== index) || [];
    handleChange('technologies', technologies);
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
          placeholder="Work Experience"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Company Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            value={form.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
          <select
            value={form.employmentType}
            onChange={(e) => handleChange('employmentType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select type</option>
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="month"
            value={form.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="month"
            value={form.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={form.isCurrentRole}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="currentRole"
          checked={form.isCurrentRole}
          onChange={(e) => handleChange('isCurrentRole', e.target.checked)}
          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
        />
        <label htmlFor="currentRole" className="text-sm text-gray-700">
          I currently work here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Describe your responsibilities and accomplishments..."
          minRows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Technologies</label>
          <button
            type="button"
            onClick={handleAddTechnology}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            Add Technology
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.technologies?.map((tech, index) => (
            <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleUpdateTechnology(index, e.target.value)}
                className="w-24 px-1 py-0.5 text-sm bg-transparent focus:outline-none"
                placeholder="Tech"
              />
              <button
                type="button"
                onClick={() => handleDeleteTechnology(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Key Achievements</label>
          <button
            type="button"
            onClick={handleAddAchievement}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            Add Achievement
          </button>
        </div>
        <div className="space-y-2">
          {form.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-gray-400 mt-2">•</span>
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleUpdateAchievement(index, e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Describe an achievement..."
              />
              <button
                type="button"
                onClick={() => handleDeleteAchievement(index)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
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
