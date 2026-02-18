import { ResumeLanguage } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';

const PROFICIENCY_LEVELS: ResumeLanguage['proficiency'][] = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
];

export default function LanguageFormEditor({ form, onChange }: FormEditorProps<ResumeLanguage>) {
  const handleChange = (field: keyof ResumeLanguage, value: string) => {
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
          placeholder="Languages"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <input
          type="text"
          value={form.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="English"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
        <select
          value={form.proficiency}
          onChange={(e) => handleChange('proficiency', e.target.value as ResumeLanguage['proficiency'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {PROFICIENCY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
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
