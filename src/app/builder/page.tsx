"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormToPDF from "./components/FormToPDF";
import LeftSide from "./LeftSide";
import { useFormHolders } from "@/hooks/useFormHolders";
import { setCvId } from "@/store/formSlice";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";

export default function Builder(){
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const cvId = useSelector((state: RootState) => state.forms.cvId);
    const { loading, error } = useFormHolders(cvId);
    
    useEffect(() => {
        const cvIdFromParams = searchParams.get('cvId');
        if (cvIdFromParams !== cvId) {
            dispatch(setCvId(cvIdFromParams));
        }
    }, [searchParams, dispatch, cvId]);
    
    if (loading) {
        return <div className="flex items-center justify-center h-screen"><Spinner/></div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;
    }
    
    return(
        <div className="flex lg:flex-row flex-col">
            <LeftSide />
            <div className="lg:w-7/12 w-full flex flex-col items-center p-6">
                <FormToPDF />
            </div>
        </div>
    )
}