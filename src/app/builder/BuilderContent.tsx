"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormToPDF from "./components/FormToPDF";
import LeftSide from "./LeftSide";
import { useFormHolders } from "@/hooks/useFormHolders";
import { setCvId, setCvTemplate } from "@/store/formSlice";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";

export default function BuilderContent(){
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const router = useRouter()

    const cvId = useSelector((state: RootState) => state.forms.cvId);
    const { loading, error } = useFormHolders(cvId);
    
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const cvIdFromParams = useMemo(() => searchParams.get('cvId'), [searchParams]);

    useEffect(() => {
        if (cvIdFromParams !== cvId) {
            dispatch(setCvId(cvIdFromParams));
        }
    }, [cvIdFromParams, dispatch, cvId]);

    const cvTemplate = useSelector((state: RootState) => state.forms.cvTemplate)
    const cvTemplateFromParams = useMemo(() => searchParams.get('cvTemplate'), [searchParams]);

    useEffect(() => {
        if (cvTemplateFromParams !== cvTemplate) {
            dispatch(setCvTemplate(cvTemplateFromParams));
        }
    }, [cvTemplateFromParams, dispatch, cvTemplate]);
    
    if (loading || !mounted) {
        return <div className="flex items-center justify-center h-screen"><Spinner/></div>;
    }

    if (error) {
        router.replace('/error')
    }
    
    return(
        <div className="flex lg:flex-row flex-col">
            <LeftSide />
            <div className="lg:w-7/12 w-full flex flex-col items-center p-6">
                <FormToPDF/>
            </div>
        </div>
    )
}