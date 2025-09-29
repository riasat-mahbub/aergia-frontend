import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from './useApi';
import { setFormHolders, updateFormHolder, deleteFormHolder as deleteFormHolderAction, reorderFormHolders, updateFormHolderData as updateFormHolderDataAction } from '@/store/formSlice';
import { FormHolder } from '@/types/FormHolderTypes';
import { ResumeForm } from '@/types/ResumeFormTypes';
import { RootState } from '@/store/store';

export function useFormHolders(cvId: string | null) {
  const { execute, loading, error, api } = useApi();
  const dispatch = useDispatch();
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);
  const loadedCvId = useRef<string | null>(null);

  useEffect(() => {
    if (!cvId || loadedCvId.current === cvId) return;

    const loadFormHolders = async () => {
      const result = await execute(() => api.formGroups.getAll(cvId));
      if (result) {
        const formHolders: FormHolder[] = result.formHolders.map((formGroup: any) => ({
          id: formGroup.id,
          title: formGroup.title,
          icon: 'default',
          type: formGroup.type,
          data: formGroup.data,
          style: formGroup.style,
          visible: formGroup.visible,
          order: formGroup.order
        }));

        formHolders.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
        dispatch(setFormHolders(formHolders));
        loadedCvId.current = cvId;
      }
    };

    loadFormHolders();
  }, [cvId, execute, dispatch]);

  const saveFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    // Optimistic update
    dispatch(await updateFormHolder(formHolder));
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      style: JSON.stringify(formHolder.style),
    };

    const result = await execute(() => api.formGroups.create(cvId, data));
    
    // Rollback on failure
    if (!result) {
      const currentHolders = formHolders.filter(h => h.id !== formHolder.id);
      dispatch(setFormHolders(currentHolders));
    }
    
    return result;
  };

  const updateFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    // Store original for rollback
    const originalHolder = formHolders.find(h => h.id === formHolder.id);
    
    // Optimistic update
    dispatch(await updateFormHolder(formHolder));
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      style: JSON.stringify(formHolder.style),
      visible: formHolder.visible,
      order: formHolder.order
    };

    const result = await execute(() => api.formGroups.update(cvId, formHolder.id, data));
    
    // Rollback on failure
    if (!result && originalHolder) {
      dispatch(await updateFormHolder(originalHolder));
    }
    
    return result;
  };

  const reorderFormHolder = async(activeId:string, overId:string) =>{
    if (!cvId) return null;
    
    // Store original order for rollback
    const originalHolders = [...formHolders];
    
    // Optimistic update
    dispatch(reorderFormHolders({ activeId, overId }));
    
    const data = {
      activeId: activeId,
      overId: overId
    }
    
    const result = await execute(() => api.formGroups.reorder(cvId, data));
    
    // Rollback on failure
    if (!result) {
      dispatch(setFormHolders(originalHolders));
    }
    
    return result;
  }

  const updateFormHolderData = async (formHolder: FormHolder, form: ResumeForm) => {
    if (!cvId) return null;

    const shouldUpdate = formHolder.data.findIndex( (item) =>{
      return item.id === form.id
    })

    const newData = shouldUpdate !==  -1 ? 
    formHolder.data.map( (item) =>item.id === form.id ? form : item) :
    [...formHolder.data, form]

    // Store original data for rollback
    const originalData = formHolder.data;
    
    // Optimistic update
    dispatch(updateFormHolderDataAction({ formHolderId: formHolder.id, data: newData }));

    const data = {...formHolder, data:JSON.stringify(newData)};

    const result = await execute(() => api.formGroups.update(cvId, formHolder.id, data));
    
    // Rollback on failure
    if (!result) {
      dispatch(updateFormHolderDataAction({ formHolderId: formHolder.id, data: originalData }));
    }
    
    return result;
  };

  const deleteFormHolder = async (formHolderId: string) => {
    if (!cvId) return null;
    
    // Store original for rollback
    const originalHolder = formHolders.find(h => h.id === formHolderId);
    
    // Optimistic update
    dispatch(deleteFormHolderAction(formHolderId));
    
    const result = await execute(() => api.formGroups.delete(cvId, formHolderId));
    
    // Rollback on failure
    if (!result && originalHolder) {
      dispatch(await updateFormHolder(originalHolder));
    }
    
    return result;
  };

  return {
    loading,
    error,
    saveFormHolder,
    updateFormHolder,
    reorderFormHolder,
    deleteFormHolder,
    updateFormHolderData
  };
}