import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, FileUp, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreatePopOver from "../components/cvs/popovers/createPopOver";
import DeletePopOver from "../components/cvs/popovers/deletePopOver";
import EditPopOver from "../components/cvs/popovers/editPopOver";
import { useCVs } from "@/hooks/useCVs";
import { useApi } from "@/hooks/useApi";
import { CV } from "@/types/CvTypes";
import { CVGrid } from "../components/cvs/CVGrid";

export default function CVs() {
  const { cvs, loading, createCv } = useCVs();
  const { execute, api } = useApi();
  const navigate = useNavigate();
  const [isImporting, setIsImporting] = useState(false);

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

  const handleImportPdf = async () => {
    setIsImporting(true);
    try {
      const result = await execute(() => api.import.fromPdf());
      if (result?.success && result.cvId) {
        // Navigate to the new CV
        navigate(`/builder?cvId=${result.cvId}&cvTemplate=default`);
      } else if (result?.error) {
        alert(`Import failed: ${result.error}`);
      }
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My CVs</h1>
        <div className="flex gap-2">
          <button
            onClick={handleImportPdf}
            disabled={isImporting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold p-3 rounded-full shadow transition flex items-center gap-2"
          >
            {isImporting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Importing...
              </>
            ) : (
              <>
                <FileUp size={20} />
                Import PDF
              </>
            )}
          </button>
          <button
            onClick={() => openPopOver("create")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-3 rounded-full shadow transition"
          >
            <Plus />
          </button>
        </div>
      </div>

      {loading && cvs.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
