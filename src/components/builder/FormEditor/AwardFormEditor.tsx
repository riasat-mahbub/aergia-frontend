import { ResumeAward } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import TextareaAutosize from 'react-textarea-autosize';

export default function AwardFormEditor({ form, onChange }: FormEditorProps<ResumeAward>) {
  const handleChange = (field: keyof ResumeAward, value: string) => {
    onChange({ ...form, [field]: value });
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
          placeholder="Awards"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Employee of the Year"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
        <input
          type="text"
          value={form.issuer}
          onChange={(e) => handleChange('issuer', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Company Name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
          <input
            type="month"
            value={form.dateReceived}
            onChange={(e) => handleChange('dateReceived', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => handleChange('url', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Describe the award and why you received it..."
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
