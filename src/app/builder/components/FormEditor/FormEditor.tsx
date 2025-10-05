'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { getFormHolderById, setSelectedForm, updateForm } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";
import { FORM_COMPONENTS } from "./FormEditorRegistry";

interface FormEditorProps {
  form: ResumeForm;
  formHolderId: string;
}

export default function FormEditor({ form, formHolderId }: FormEditorProps) {
  const dispatch = useDispatch();
  const cvId = useSelector((state: RootState) => state.forms.cvId);
  const { updateFormHolderData } = useFormHolders(cvId);
  const formHolder = useSelector((state: RootState) => 
    getFormHolderById(state, formHolderId)
  );

  const [formData, setFormData] = useState(form);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formHolder || !cvId) return;

    setLoading(true);
    try {
      await updateFormHolderData(formHolder, formData);
      dispatch(updateForm({ formHolderId, form: formData }));
      dispatch(setSelectedForm(null));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setSelectedForm(null));
  };

  const FormComponent = FORM_COMPONENTS[form.type as keyof typeof FORM_COMPONENTS];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      {/* Title Input */}
      <div className="mb-6">
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter form title"
          disabled={loading}
          className="w-full px-4 py-3 text-xl font-semibold border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
        />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          {FormComponent ? (
            <FormComponent 
              formData={formData as any}
              onSave={handleSave}
              onCancel={handleCancel}
              handleChange={handleChange}
            />
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Unknown Form Type</h3>
              <p className="text-gray-500">The form type "{form.type}" is not recognized</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}