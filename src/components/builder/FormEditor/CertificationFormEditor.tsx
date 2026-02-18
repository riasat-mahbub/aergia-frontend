import { ResumeCertification } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';

export default function CertificationFormEditor({ form, onChange }: FormEditorProps<ResumeCertification>) {
  const handleChange = (field: keyof ResumeCertification, value: string | boolean) => {
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
          placeholder="Certifications"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="AWS Solutions Architect"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
          <input
            type="text"
            value={form.issuingOrganization}
            onChange={(e) => handleChange('issuingOrganization', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Amazon Web Services"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
          <input
            type="month"
            value={form.issueDate}
            onChange={(e) => handleChange('issueDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
          <input
            type="month"
            value={form.expirationDate}
            onChange={(e) => handleChange('expirationDate', e.target.value)}
            disabled={form.doesNotExpire}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="doesNotExpire"
          checked={form.doesNotExpire}
          onChange={(e) => handleChange('doesNotExpire', e.target.checked)}
          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
        />
        <label htmlFor="doesNotExpire" className="text-sm text-gray-700">
          This certification does not expire
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
        <input
          type="text"
          value={form.credentialId}
          onChange={(e) => handleChange('credentialId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="ABC123XYZ"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
        <input
          type="url"
          value={form.credentialUrl}
          onChange={(e) => handleChange('credentialUrl', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="https://verify.credential.net/..."
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
