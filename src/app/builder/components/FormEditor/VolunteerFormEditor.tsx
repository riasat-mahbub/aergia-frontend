'use client'
import { ResumeVolunteer } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";

export default function VolunteerFormEditor({ formData, handleChange }: BaseEditorProps<ResumeVolunteer>) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
        <input
          type="text"
          value={formData.organization || ''}
          onChange={(e) => handleChange('organization', e.target.value)}
          placeholder="e.g., Habitat for Humanity, Local Food Bank"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input
          type="text"
          value={formData.role || ''}
          onChange={(e) => handleChange('role', e.target.value)}
          placeholder="e.g., Volunteer Coordinator, Event Organizer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cause Area</label>
        <select
          value={formData.cause || ''}
          onChange={(e) => handleChange('cause', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Cause Area</option>
          <option value="Animal Welfare">Animal Welfare</option>
          <option value="Arts & Culture">Arts & Culture</option>
          <option value="Children & Youth">Children & Youth</option>
          <option value="Community Development">Community Development</option>
          <option value="Education & Literacy">Education & Literacy</option>
          <option value="Environment">Environment</option>
          <option value="Health & Medicine">Health & Medicine</option>
          <option value="Human Rights">Human Rights</option>
          <option value="Poverty Alleviation">Poverty Alleviation</option>
          <option value="Religious">Religious</option>
          <option value="Sports & Recreation">Sports & Recreation</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          value={formData.cause || ''}
          onChange={(e) => handleChange('cause', e.target.value)}
          placeholder="Or enter custom cause"
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.isCurrentRole || false}
          onChange={(e) => handleChange('isCurrentRole', e.target.checked.toString())}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">I currently volunteer here</label>
      </div>
      
      <div className="flex flex-row flex-wrap justify-between">
        <div className="flex-3/12 mr-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="text"
            value={formData.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            placeholder="Jan 2020"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="text"
            value={formData.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            disabled={formData.isCurrentRole}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={formData.isCurrentRole ? 'Present' : 'Dec 2023'}
          />
        </div>

        <div className="flex-1/12"></div>

        <div className="flex-3/12">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, State/Country or Remote"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
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