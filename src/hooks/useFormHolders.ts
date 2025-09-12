import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from './useApi';
import { setFormHolders } from '@/store/formSlice';
import { FormHolder } from '@/types/FormHolderTypes';

export function useFormHolders(cvId: string | null) {
  const { execute, loading, error, api } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cvId) return;

    const loadFormHolders = async () => {
      const result = await execute(() => api.formGroups.getAll(cvId));
      if (result) {
        const formHolders: FormHolder[] = result.formHolders.map((formGroup: any) => ({
          id: formGroup.id,
          title: formGroup.title,
          icon: 'default',
          type: formGroup.type,
          data: JSON.parse(formGroup.data),
          visible: formGroup.visible
        }));
        dispatch(setFormHolders(formHolders));
      }
    };

    loadFormHolders();
  }, [cvId, dispatch]);

  const saveFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
    };

    return execute(() => api.formGroups.create(cvId, data));
  };

  const updateFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      visible: formHolder.visible
    };

    return execute(() => api.formGroups.update(cvId, formHolder.id, data));
  };

  const deleteFormHolder = async (formHolderId: string) => {
    if (!cvId) return null;
    return execute(() => api.formGroups.delete(cvId, formHolderId));
  };

  return {
    loading,
    error,
    saveFormHolder,
    updateFormHolder,
    deleteFormHolder
  };
}