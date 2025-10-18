'use client'
import { ResumeProfile, ResumeURL } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import IconPicker from "@/components/IconPicker";
import { Plus, Trash, Trash2, X } from "lucide-react";


interface ProfileFormEditorProps extends BaseEditorProps<ResumeProfile>{
  handleUrl: (url: ResumeURL, operation:"add"|"remove"|"change",  index?: number) => void;
}

export default function ProfileFormEditor({ formData, handleChange, handleUrl }: ProfileFormEditorProps) {

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

      {
        formData.urls.map((url, idx) => (
          <div key={idx} className="p-5 mb-6 border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <IconPicker
                  selectedIcon={url.urlIcon}
                  onIconChange={(selectedIcon) =>
                    handleUrl(
                      { title: url.title, url: url.url, urlIcon: selectedIcon },
                      "change",
                      idx
                    )
                  }
                />
                <span>Website #{idx + 1}</span>
              </h3>
              <button
                type="button"
                onClick={() =>
                  handleUrl(
                    { title: url.title, url: url.url, urlIcon: url.urlIcon },
                    "remove",
                    idx
                  )
                }
                className="text-red-500 hover:text-red-600 transition-colors"
                title="Remove this website"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url.url || ""}
                    onChange={(e) =>
                      handleUrl(
                        { title: url.title, url: e.target.value, urlIcon: url.urlIcon },
                        "change",
                        idx
                      )
                    }
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website Name
                </label>
                <input
                  type="text"
                  value={url.title || ""}
                  onChange={(e) =>
                    handleUrl(
                      { title: e.target.value, url: url.url, urlIcon: url.urlIcon },
                      "change",
                      idx
                    )
                  }
                  placeholder="e.g., Personal Portfolio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                />
              </div>
            </div>
          </div>
        ))
      }

      {/* Add Button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => handleUrl({ title: "", url: "", urlIcon: "" }, "add")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md transition-all duration-300"
        >
          <Plus size={18} />
          Add Website
        </button>
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