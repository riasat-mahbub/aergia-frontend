import { ResumeProject } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import { Plus, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function ProjectFormEditor({ form, onChange }: FormEditorProps<ResumeProject>) {
  const handleChange = (field: keyof ResumeProject, value: string | boolean | string[]) => {
    onChange({ ...form, [field]: value });
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
          placeholder="Projects"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input
            type="text"
            value={form.project}
            onChange={(e) => handleChange('project', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Project Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Short description"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
          <input
            type="url"
            value={form.projectUrl}
            onChange={(e) => handleChange('projectUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Lead Developer"
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
            disabled={form.isOngoing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Remote"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ongoing"
          checked={form.isOngoing}
          onChange={(e) => handleChange('isOngoing', e.target.checked)}
          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
        />
        <label htmlFor="ongoing" className="text-sm text-gray-700">
          Ongoing project
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Describe the project, your contributions, and impact..."
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
