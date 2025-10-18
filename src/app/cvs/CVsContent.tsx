"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import CreatePopOver from "./popovers/createPopOver";
import DeletePopOver from "./popovers/deletePopOver";
import EditPopOver from "./popovers/editPopOver";
import { useCVs } from "@/hooks/useCVs";
import { CV } from "@/types/CvTypes";
import { CVGrid } from "./CVGrid";

export default function CVsContent() {
  const { cvs, loading, createCv } = useCVs();

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

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My CVs</h1>
        <button
          onClick={() => openPopOver("create")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-3 rounded-full shadow transition"
        >
          <Plus />
        </button>
      </div>

      {/* Grid or Skeleton */}
      {loading && cvs.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="w-64 h-64 bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between"
            >
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex-1 mt-4 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="flex justify-end gap-2 mt-3">
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <CVGrid cvs={cvs} openPopOver={openPopOver} />
      )}

      {/* Empty State */}
      {cvs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No CVs found</p>
          <button
            onClick={() => openPopOver("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded transition"
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
