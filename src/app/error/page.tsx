"use client"

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error(){
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
        router.push('/');
        }, 2000);

    }, []);

    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-6xl mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Oops! It seems you encountered an unexpected error.</h1>
            <Spinner />
        <p className="mt-4 text-gray-600">Redirecting you to the Homepage...</p>
    </div>
    );
}