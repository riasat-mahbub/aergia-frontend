"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Spinner from "@/components/Spinner";
import CreatePopOver from "./popovers/createPopOver";
import DeletePopOver from "./popovers/deletePopOver";
import EditPopOver from "./popovers/editPopOver";
import { useCVs } from "@/hooks/useCVs";
import { CV } from "@/types/CvTypes";
import { CVGrid } from "./CVGrid";

export default function CVsContent() {
  const { cvs, loading, createCv, deleteCv } = useCVs();

  const [currentPopOver, setCurrentPopOver] = useState<string>("");
  const [currentCv, setCurrentCv] = useState<CV | null>(null);
  const [currentId, setCurrentId] = useState("");

  const openPopOver = (name: string, id?: string, cv?: CV) => {
    setCurrentPopOver(name);
    if (id) setCurrentId(id);
    if (cv) setCurrentCv(cv);
  };

  const closePopOver = () => {
    setCurrentPopOver("");
    setCurrentCv(null);
    setCurrentId("");
  };

  if (loading && cvs.length === 0) return <Spinner />;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My CVs</h1>
        <button
          onClick={() => openPopOver("create")}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-full"
        >
          <Plus />
        </button>
      </div>

      {/* CV Grid */}
      <CVGrid cvs={cvs} openPopOver={openPopOver} />

      {/* Empty State */}
      {cvs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No CVs found</p>
          <button
            onClick={() => openPopOver("create")}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Your First CV
          </button>
        </div>
      )}

      {/* Popovers */}
      {currentPopOver === "create" && (
        <CreatePopOver closePopOver={closePopOver} createCv={createCv} />
      )}

      {currentPopOver === "edit" && currentCv && (
        <EditPopOver cv={currentCv} closePopOver={closePopOver} />
      )}

      {currentPopOver === "delete" && currentId && (
        <DeletePopOver id={currentId} closePopOver={closePopOver} />
      )}
    </div>
  );
}
