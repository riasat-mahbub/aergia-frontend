import { ResumeProfile, ProfileItem, ResumeURL } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import InfoItemEditor from './InfoItemEditor';
import TextareaAutosize from 'react-textarea-autosize';

export default function ProfileFormEditor({ form, onChange }: FormEditorProps<ResumeProfile>) {
  const handleChange = (field: keyof ResumeProfile, value: string | ProfileItem[] | ResumeURL[]) => {
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
          placeholder="Profile"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <TextareaAutosize
          value={form.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="A brief professional summary..."
          minRows={3}
        />
      </div>

      <InfoItemEditor
        items={form.infos}
        onChange={(items) => handleChange('infos', items)}
        itemType="info"
      />

      <InfoItemEditor
        items={form.urls}
        onChange={(items) => handleChange('urls', items as ResumeURL[])}
        itemType="url"
      />

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
