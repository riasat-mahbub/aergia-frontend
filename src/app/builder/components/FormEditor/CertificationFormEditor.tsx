'use client'
import { ResumeCertification } from "@/types/ResumeFormTypes";
import { BaseEditorProps } from "./FormEditor";

export default function CertificationFormEditor({ formData, handleChange }: BaseEditorProps<ResumeCertification>) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g., AWS Certified Solutions Architect"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
        <input
          type="text"
          value={formData.issuingOrganization || ''}
          onChange={(e) => handleChange('issuingOrganization', e.target.value)}
          placeholder="e.g., Amazon Web Services"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
        <input
          type="text"
          value={formData.credentialId || ''}
          onChange={(e) => handleChange('credentialId', e.target.value)}
          placeholder="Optional certification ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
        <input
          type="url"
          value={formData.credentialUrl || ''}
          onChange={(e) => handleChange('credentialUrl', e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex-5/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
          <input
            type="text"
            value={formData.issueDate || ''}
            onChange={(e) => handleChange('issueDate', e.target.value)}
            placeholder="Jan 2023"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-5/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
          <input
            type="text"
            value={formData.expirationDate || ''}
            onChange={(e) => handleChange('expirationDate', e.target.value)}
            disabled={formData.doesNotExpire}
            placeholder={formData.doesNotExpire ? 'No Expiration' : 'Jan 2026'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.doesNotExpire || false}
          onChange={(e) => handleChange('doesNotExpire', e.target.checked.toString())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">This certification does not expire</label>
      </div>
    </div>
  );
}