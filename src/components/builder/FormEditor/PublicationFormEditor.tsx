import { ResumePublication } from '@/types/ResumeFormTypes';
import { FormEditorProps } from './FormEditorRegistry';
import { Plus, Trash2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export default function PublicationFormEditor({ form, onChange }: FormEditorProps<ResumePublication>) {
  const handleChange = (field: keyof ResumePublication, value: string | string[]) => {
    onChange({ ...form, [field]: value });
  };

  const handleAddAuthor = () => {
    const authors = [...(form.authors || []), ''];
    handleChange('authors', authors);
  };

  const handleUpdateAuthor = (index: number, value: string) => {
    const authors = [...(form.authors || [])];
    authors[index] = value;
    handleChange('authors', authors);
  };

  const handleDeleteAuthor = (index: number) => {
    const authors = form.authors?.filter((_, i) => i !== index) || [];
    handleChange('authors', authors);
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
          placeholder="Publications"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publication Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Research Paper Title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
          <input
            type="text"
            value={form.publisher}
            onChange={(e) => handleChange('publisher', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Journal Name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
          <input
            type="month"
            value={form.publicationDate}
            onChange={(e) => handleChange('publicationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publication URL</label>
          <input
            type="url"
            value={form.publicationUrl}
            onChange={(e) => handleChange('publicationUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="https://doi.org/..."
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Authors</label>
          <button
            type="button"
            onClick={handleAddAuthor}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Plus size={14} />
            Add Author
          </button>
        </div>
        <div className="space-y-2">
          {form.authors?.map((author, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleUpdateAuthor(index, e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Author Name"
              />
              <button
                type="button"
                onClick={() => handleDeleteAuthor(index)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <TextareaAutosize
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
          placeholder="Abstract or description of the publication..."
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
