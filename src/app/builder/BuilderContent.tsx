"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormToPDF from "./components/FormToPDF";
import LeftSide from "./LeftSide";
import { useFormHolders } from "@/hooks/useFormHolders";
import { setSelectedCvId, setSelectedCvTemplate } from "@/store/cvsSlice";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";

export default function BuilderContent(){
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const router = useRouter()

    const cvId = useSelector((state: RootState) => state.cv.selectedCvId);
    const { loading, error } = useFormHolders();
    
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const cvIdFromParams = useMemo(() => searchParams.get('cvId'), [searchParams]);

    useEffect(() => {
        if (cvIdFromParams !== cvId) {
            dispatch(setSelectedCvId(cvIdFromParams));
        }
    }, [cvIdFromParams, dispatch, cvId]);

    const cvTemplate = useSelector((state: RootState) => state.cv.selectedCvTemplate)
    const cvTemplateFromParams = useMemo(() => searchParams.get('cvTemplate'), [searchParams]);

    useEffect(() => {
        if (cvTemplateFromParams !== cvTemplate) {
            dispatch(setSelectedCvTemplate(cvTemplateFromParams));
        }
    }, [cvTemplateFromParams, dispatch, cvTemplate]);
    
    if (loading || !mounted) {
        return(
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-4 w-1/2">
                    {[...Array(4)].map((_, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="w-full h-32 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
                            <div>
                                <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex-1 mt-4 bg-gray-100 rounded-lg animate-pulse"></div>
                            
                        </motion.div>
                    ))}
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
                    className="w-full h-32 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">

                </motion.div>
            </div>

        )
    }

    if (error) {
        router.replace('/error')
    }
    
    return(
        <div className="flex lg:flex-row flex-col">
            <LeftSide />
            <div className="lg:w-7/12 w-full hidden lg:flex lg:flex-col items-center p-6">
                <FormToPDF/>
            </div>
        </div>
    )
}