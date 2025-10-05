"use client"

import { ProtectedRoute } from "@/components/ProtectedRoute";
import CVsContent from "./CVsContent";

export default function CVsPage() {

  return (
    <ProtectedRoute>
      <CVsContent/>
    </ProtectedRoute>
  );
}