import { useDispatch, useSelector } from 'react-redux';
import { X, ChevronLeft, Save, Trash2 } from 'lucide-react';
import { ResumeForm } from '@/types/ResumeFormTypes';
import { updateForm, deleteForm, setSelectedForm } from '@/store/formSlice';
import { useFormHolders } from '@/hooks/useFormHolders';
import { getFormEditor } from './FormEditorRegistry';
import { useState, useCallback, useEffect } from 'react';
import { RootState } from '@/store/store';

interface FormEditorProps {
  form: ResumeForm;
  formHolderId: string;
}

export default function FormEditor({ form, formHolderId }: FormEditorProps) {
  const dispatch = useDispatch();
  const { updateFormHolderData } = useFormHolders();
  const [localForm, setLocalForm] = useState<ResumeForm>(form);
  const [isSaving, setIsSaving] = useState(false);

  // Get the actual formHolder from Redux state
  const formHolder = useSelector((state: RootState) =>
    state.forms.formHolders.find(h => h.id === formHolderId)
  );

  useEffect(() => {
    setLocalForm(form);
  }, [form]);

  const handleChange = useCallback((updatedForm: ResumeForm) => {
    setLocalForm(updatedForm);
  }, []);

  const handleSave = async () => {
    if (!formHolder) return;

    setIsSaving(true);
    dispatch(updateForm({ formHolderId, form: localForm }));
    await updateFormHolderData(formHolder, localForm);
    setIsSaving(false);
  };

  const handleClose = () => {
    dispatch(setSelectedForm(null));
  };

  const handleDelete = async () => {
    dispatch(deleteForm({ formHolderId, formId: localForm.id }));
    handleClose();
  };

  const EditorComponent = getFormEditor<ResumeForm>(localForm.type);

  if (!EditorComponent) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">Unknown form type: {localForm.type}</p>
        <button onClick={handleClose} className="mt-2 text-sm text-gray-500 underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">{localForm.title || 'Edit Form'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <EditorComponent
          form={localForm}
          formHolderId={formHolderId}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
