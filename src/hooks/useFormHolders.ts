import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from './useApi';
import { setFormHolders, addFormHolderFromStore, updateFormHolder as updateFormHolderAction, deleteFormHolder as deleteFormHolderAction } from '@/store/formSlice';
import { FormHolder } from '@/types/FormHolderTypes';
import { ResumeForm } from '@/types/ResumeFormTypes';
import { ResumeStructure } from '@/types/ResumeStructureTypes';
import { RootState } from '@/store/store';
import type { FormGroup } from '@/vite-env';

// Global ref to prevent multiple loads across hook instances
const hasLoadedRef = { current: null as string | null };

export function useFormHolders() {
  const { execute, loading, error, api } = useApi();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const cvId = useSelector((state: RootState) => state.cv.selectedCvId);
  const existingFormHolders = useSelector((state: RootState) => state.forms.formHolders);

  useEffect(() => {
    if (!cvId) return;
    
    // Skip if already loaded for this CV
    if (hasLoadedRef.current === cvId) return;
    
    // Skip if we already have formHolders in Redux (prevents overwrite on remount)
    if (existingFormHolders.length > 0) {
      hasLoadedRef.current = cvId;
      return;
    }

    const loadFormHolders = async () => {
      setIsLoading(true);
      hasLoadedRef.current = cvId;
      
      const result = await execute(() => api.formGroups.getAll(cvId));
      if (result) {
        const formHolders: FormHolder[] = result.formHolders.map((formGroup: FormGroup) => ({
          id: formGroup.id,
          title: formGroup.title,
          type: formGroup.type,
          data: formGroup.data as ResumeForm[],
          style: formGroup.style ?? undefined,
          structure: formGroup.structure as ResumeStructure | undefined,
          visible: formGroup.visible,
          order: formGroup.order,
          dateFormat: formGroup.dateFormat
        }));

        formHolders.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
        dispatch(setFormHolders(formHolders));
      }
      
      setIsLoading(false);
    };

    loadFormHolders();
  }, [cvId, execute, dispatch, api.formGroups, existingFormHolders.length]);

  const saveFormHolder = async (title: string, type: string): Promise<FormHolder | null> => {
    if (!cvId) return null;
    
    const data = {
      title,
      type,
      data: [],
    };

    const result = await execute(() => api.formGroups.create(cvId, data));
    if (result && 'formGroup' in result && result.formGroup) {
      const fg = result.formGroup;
      const formHolder: FormHolder = {
        id: fg.id,
        title: fg.title,
        type: fg.type,
        data: fg.data as ResumeForm[],
        style: fg.style ?? undefined,
        structure: fg.structure as ResumeStructure | undefined,
        visible: fg.visible,
        order: fg.order,
        dateFormat: fg.dateFormat
      };
      dispatch(addFormHolderFromStore(formHolder));
      return formHolder;
    }
    return null;
  };

  const updateFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      style: JSON.stringify(formHolder.style),
      visible: formHolder.visible,
      order: formHolder.order,
      dateFormat: formHolder.dateFormat
    };

    const result = await execute(() => api.formGroups.update(cvId, formHolder.id, data));
    if (result && 'formGroup' in result && result.formGroup) {
      dispatch(updateFormHolderAction(formHolder));
    }
    return result;
  };

  const reorderFormHolder = async(activeId:string, overId:string) =>{
    if (!cvId) return null;
    
    const data = {
      activeId: activeId,
      overId: overId
    }
    return execute(() => api.formGroups.reorder(cvId, data));
  }

  const updateFormHolderData = async (formHolder: FormHolder, form: ResumeForm) => {
    if (!cvId) return null;

    const shouldUpdate = formHolder.data.findIndex( (item) =>{
      return item.id === form.id
    })

    const newData = shouldUpdate !==  -1 ? 
    formHolder.data.map( (item) =>item.id === form.id ? form : item) :
    [...formHolder.data, form]

    const data = {...formHolder, data:JSON.stringify(newData)};

    return execute(() => api.formGroups.update(cvId, formHolder.id, data));
    
  };

  const deleteFormHolder = async (formHolderId: string) => {
    if (!cvId) return null;
    const result = await execute(() => api.formGroups.delete(cvId, formHolderId));
    if (result) {
      dispatch(deleteFormHolderAction(formHolderId));
    }
    return result;
  };

  return {
    loading: loading || isLoading,
    error,
    saveFormHolder,
    updateFormHolder,
    reorderFormHolder,
    deleteFormHolder,
    updateFormHolderData
  };
}