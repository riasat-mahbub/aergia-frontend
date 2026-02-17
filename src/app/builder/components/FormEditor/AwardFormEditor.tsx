'use client'
import { ResumeAward } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";

export default function AwardFormEditor({ formData, handleChange }: BaseEditorProps<ResumeAward>) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Employee of the Year, Best Innovation Award"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
        <input
          type="text"
          value={formData.issuer || ''}
          onChange={(e) => handleChange('issuer', e.target.value)}
          placeholder="e.g., Company Name, University, Competition Organizer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
        <input
          type="text"
          value={formData.dateReceived || ''}
          onChange={(e) => handleChange('dateReceived', e.target.value)}
          placeholder="Dec 2023"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Award URL (Optional)</label>
        <input
          type="url"
          value={formData.url || ''}
          onChange={(e) => handleChange('url', e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <RichTextEditor 
          content={formData.description || ''} 
          onChange={(html) => handleChange('description', html)} 
        />
      </div>
    </div>
  );
}