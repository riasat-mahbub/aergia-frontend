"use client";

import { Suspense } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import BuilderContent from "./BuilderContent";

export default function Builder(){
    
    return(
        <ProtectedRoute>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>
                <BuilderContent/>
            </Suspense>
        </ProtectedRoute>
    )
}