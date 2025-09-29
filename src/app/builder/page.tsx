"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import BuilderContent from "./BuilderContent";

export default function Builder(){
    
    return(
        <ProtectedRoute>
            <BuilderContent/>
        </ProtectedRoute>
    )
}