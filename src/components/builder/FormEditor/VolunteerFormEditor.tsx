import { ResumeVolunteer } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import TextareaAutosize from 'react-textarea-autosize';

export default function VolunteerFormEditor({ form, onChange }: FormEditorProps<ResumeVolunteer>) {
  const handleChange = (field: keyof ResumeVolunteer, value: string | boolean) => {
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
          placeholder="Volunteer Experience"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
          <input
            type="text"
            value={form.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Non-profit Organization"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Volunteer Coordinator"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cause</label>
        <input
          type="text"
          value={form.cause}
          onChange={(e) => handleChange('cause', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Environmental, Education, Healthcare..."
        />
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
          I currently volunteer here
        </label>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Describe your volunteer work and impact..."
          minRows={3}
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
