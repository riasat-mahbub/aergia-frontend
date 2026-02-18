import { ResumeEducation } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import { Plus, Trash2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function EducationFormEditor({ form, onChange }: FormEditorProps<ResumeEducation>) {
  const handleChange = (field: keyof ResumeEducation, value: string | boolean | string[]) => {
    onChange({ ...form, [field]: value });
  };

  const handleAddHonor = () => {
    const honors = [...(form.honors || []), ''];
    handleChange('honors', honors);
  };

  const handleUpdateHonor = (index: number, value: string) => {
    const honors = [...(form.honors || [])];
    honors[index] = value;
    handleChange('honors', honors);
  };

  const handleDeleteHonor = (index: number) => {
    const honors = form.honors?.filter((_, i) => i !== index) || [];
    handleChange('honors', honors);
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
          placeholder="Education"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
          <input
            type="text"
            value={form.school}
            onChange={(e) => handleChange('school', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="University Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Boston, MA"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input
            type="text"
            value={form.degree}
            onChange={(e) => handleChange('degree', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Bachelor of Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
          <input
            type="text"
            value={form.fieldOfStudy}
            onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Computer Science"
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
            disabled={form.isCurrentlyStudying}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="currentlyStudying"
          checked={form.isCurrentlyStudying}
          onChange={(e) => handleChange('isCurrentlyStudying', e.target.checked)}
          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
        />
        <label htmlFor="currentlyStudying" className="text-sm text-gray-700">
          Currently studying here
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
          <input
            type="text"
            value={form.gpa}
            onChange={(e) => handleChange('gpa', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="3.8/4.0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Relevant coursework, activities, or achievements..."
          minRows={3}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Honors & Awards</label>
          <button
            type="button"
            onClick={handleAddHonor}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            Add Honor
          </button>
        </div>
        <div className="space-y-2">
          {form.honors?.map((honor, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={honor}
                onChange={(e) => handleUpdateHonor(index, e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Dean's List, Magna Cum Laude..."
              />
              <button
                type="button"
                onClick={() => handleDeleteHonor(index)}
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
