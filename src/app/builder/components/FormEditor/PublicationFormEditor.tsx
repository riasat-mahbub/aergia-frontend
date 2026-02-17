'use client'
import { ResumePublication } from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { BaseEditorProps } from "./FormEditor";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function PublicationFormEditor({ formData, handleChange }: BaseEditorProps<ResumePublication>) {
  const [authorInput, setAuthorInput] = useState("");

  const handleAuthorAdd = () => {
    if (authorInput.trim()) {
      handleChange('authors', JSON.stringify([...(formData.authors || []), authorInput.trim()]));
      setAuthorInput("");
    }
  };

  const handleAuthorRemove = (index: number) => {
    const authors = [...(formData.authors || [])];
    authors.splice(index, 1);
    handleChange('authors', JSON.stringify(authors));
  };

  const authors = formData.authors || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Publication Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g., Machine Learning Applications in Healthcare"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
        <input
          type="text"
          value={formData.publisher || ''}
          onChange={(e) => handleChange('publisher', e.target.value)}
          placeholder="e.g., Journal of Computer Science, Medium"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
        <input
          type="text"
          value={formData.publicationDate || ''}
          onChange={(e) => handleChange('publicationDate', e.target.value)}
          placeholder="Jan 2024"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Publication URL</label>
        <input
          type="url"
          value={formData.publicationUrl || ''}
          onChange={(e) => handleChange('publicationUrl', e.target.value)}
          placeholder="https://doi.org/... or https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Authors</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAuthorAdd())}
            placeholder="Add author name (e.g., John Doe, Jane Smith)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAuthorAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {authors.map((author, index) => (
            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {author}
              <button type="button" onClick={() => handleAuthorRemove(index)} className="hover:text-indigo-600">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        {authors.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-2">No authors added yet. Start typing and press Enter or click the + button to add authors.</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description / Abstract</label>
        <RichTextEditor 
          content={formData.description || ''} 
          onChange={(html) => handleChange('description', html)} 
        />
      </div>
    </div>
  );
}