'use client'
import { ResumeProfile } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import IconPicker from "@/components/IconPicker";


export default function ProfileFormEditor({ formData, handleChange }: BaseEditorProps<ResumeProfile>) {


  return (

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex flex-row w-full">
          <div className="w-1/12">
          <IconPicker selectedIcon={formData.emailIcon} onIconChange={(selectedIcon) => handleChange('emailIcon', selectedIcon)}/>
          </div>
          <input
            type="text"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <div className="flex flex-row w-full">
          <div className="w-1/12">
          <IconPicker selectedIcon={formData.phoneIcon} onIconChange={(selectedIcon) => handleChange('phoneIcon', selectedIcon)}/>
          </div>
          <input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Url</label>
        <div className="flex flex-row w-full">
          <div className="w-1/12">
          <IconPicker selectedIcon={formData.urlIcon} onIconChange={(selectedIcon) => handleChange('urlIcon', selectedIcon)}/>
          </div>
          <input
            type="text"
            value={formData.url || ''}
            onChange={(e) => handleChange('url', e.target.value)}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <div className="flex flex-row w-full">
          <div className="w-1/12">
          <IconPicker selectedIcon={formData.locationIcon} onIconChange={(selectedIcon) => handleChange('locationIcon', selectedIcon)}/>
          </div>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <RichTextEditor 
          content={formData.summary || ''} 
          onChange={(html) => handleChange('summary', html)} 
        />
      </div>
    </div>

  );
}