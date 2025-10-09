"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Spinner from "@/components/Spinner";
import CreatePopOver from "./createPopOver";
import DeletePopOver from "./deletePopOver";
import { useCVs } from "@/hooks/useCVs";
import { CVGrid } from "./CVGrid";

export default function CVsContent() {
  const { cvs, loading, createCv, deleteCv } = useCVs();

  const [currentPopOver, setCurrentPopOver] = useState("");
  const [currentId, setCurrentId] = useState("");

  const openPopOver = (name: string, id?: string) => {
    setCurrentPopOver(name);
    if (id) setCurrentId(id);
  };

  const closePopOver = () => setCurrentPopOver("");

  if (loading && cvs.length === 0) return <Spinner />;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My CVs</h1>
        <button
          onClick={() => openPopOver("create")}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-full"
        >
          <Plus />
        </button>
      </div>

      <CVGrid cvs={cvs} openPopOver={openPopOver} />

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

      {currentPopOver === "create" && (
        <CreatePopOver closePopOver={closePopOver} createCv={createCv} />
      )}

      {currentPopOver === "delete" && (
        <DeletePopOver id={currentId} closePopOver={closePopOver} removeCv={deleteCv} />
      )}
    </div>
  );
}
