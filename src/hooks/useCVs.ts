import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from './useApi';
import { RootState } from '@/store/store';
import { CV } from '@/types/CvTypes';
import {
  setCvs,
  addCv,
  updateCv as updateCvSlice,
  deleteCv as deleteCvSlice,
  reorderCvs as reorderSliceCvs,
} from '@/store/cvsSlice';

export function useCVs() {
    const { execute, loading: apiLoading, error, api } = useApi();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const hasLoadedRef = useRef(false);

    const cvs = useSelector((state: RootState) => state.cv.cvs);

    useEffect(() => {
        if (hasLoadedRef.current) return;

        const loadCvs = async () => {
            setIsLoading(true);
            hasLoadedRef.current = true;

            try {
                const result = await execute(() => api.cvs.getAll());

                if (result) {
                    const cvs:CV[] = result.cvs; 
                    const sorted = cvs.sort((a, b) => a.order - b.order);
                    dispatch(setCvs(sorted));
                }
            } catch (err) {
                console.error('Failed to load CVs', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadCvs();
    }, [dispatch, execute, api.cvs]);

    const createCv = async (title: string, template: string) => {
        const newCv = await execute(() => api.cvs.create({ title, template }));
        if (newCv) dispatch(addCv(newCv));
        return newCv;
    };

    const updateCv = async (id: string, data: { title: string; template: string; order: number }) => {
        const updatedCv = await execute(() => api.cvs.update(id, data));
        if (updatedCv) dispatch(updateCvSlice(updatedCv));
        return updatedCv;
    };

    const reorderCvs = async (activeId: string, overId: string) => {
        await execute(() => api.cvs.reorder({ "activeId": activeId, "overId": overId }));
        dispatch(reorderSliceCvs({ activeId: activeId.toString(), overId: overId.toString() }));
    };

    const deleteCv = async (id: string) => {
        await execute(() => api.cvs.delete(id));
        dispatch(deleteCvSlice(id));
    };

    return {
        cvs,
        loading: isLoading || apiLoading,
        error,
        createCv,
        updateCv,
        reorderCvs,
        deleteCv,
    };
}
