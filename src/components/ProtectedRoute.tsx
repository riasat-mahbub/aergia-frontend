"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login"); 
    }
  }, [loading, isLoggedIn, router]);

  if (loading || !isLoggedIn) {
    return (
      <div>
        <Spinner/>
      </div>
    );
  }
  return <>{children}</>;
}
