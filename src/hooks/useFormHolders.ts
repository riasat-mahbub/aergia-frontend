import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from './useApi';
import { setFormHolders } from '@/store/formSlice';
import { FormHolder } from '@/types/FormHolderTypes';
import { ResumeForm } from '@/types/ResumeFormTypes';
import { RootState } from '@/store/store';


export function useFormHolders() {
  const { execute, loading, error, api } = useApi();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef<string | null>(null);

  const cvId = useSelector((state: RootState) => state.forms.selectedCvId);

  useEffect(() => {
    if (!cvId || hasLoadedRef.current === cvId) return;
        console.log("RUN")


    const loadFormHolders = async () => {
      setIsLoading(true);
      hasLoadedRef.current = cvId;
      
      const result = await execute(() => api.formGroups.getAll(cvId));
      if (result) {
        const formHolders: FormHolder[] = result.formHolders.map((formGroup: FormHolder) => ({
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
      }
      
      setIsLoading(false);
    };

    loadFormHolders();
  }, [cvId, execute, dispatch, api.formGroups]);

  const saveFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      style: JSON.stringify(formHolder.style),
    };

    return execute(() => api.formGroups.create(cvId, data));
  };

  const updateFormHolder = async (formHolder: FormHolder) => {
    if (!cvId) return null;
    
    const data = {
      title: formHolder.title,
      type: formHolder.type,
      data: JSON.stringify(formHolder.data),
      style: JSON.stringify(formHolder.style),
      visible: formHolder.visible,
      order: formHolder.order
    };

    return execute(() => api.formGroups.update(cvId, formHolder.id, data));
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
    return execute(() => api.formGroups.delete(cvId, formHolderId));
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