'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export default function Dropzone() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Here you would typically handle the file upload to your backend
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        isDragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        
        <Upload className='mb-4'/>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 mb-3">PDF, DOC, or DOCX (Max 10MB)</p>
        
        <button 
          type="button" 
          onClick={() => document.querySelector('input')?.click()}
          className="bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 transition-colors text-sm mt-4 rounded-full"
        >
          Browse files
        </button>
        
        {files.length > 0 && (
          <div className="mt-4 w-full">
            <p className="text-sm font-medium text-gray-900">Selected file:</p>
            <p className="text-sm text-gray-500 truncate">{files[0].name}</p>
          </div>
        )}
      </div>
    </div>
  );
}