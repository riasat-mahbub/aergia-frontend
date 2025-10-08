"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import Spinner from "@/components/Spinner";
import CreatePopOver from "./createPopOver";
import DeletePopOver from "./deletePopOver";
import { apiService } from "@/services/api";
import { RootState } from "@/store/store";
import { CV } from "@/types/CvTypes";
import { addCv, removeCv, setCvLoading, setCvs } from "@/store/cvsSlice";

export default function CVsContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cvs = useSelector((state: RootState) => state.cv.cvs);
  const loading = useSelector((state: RootState) => state.cv.loading);

  const [currentPopOver, setCurrentPopOver] = useState("");
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    // Always refetch to keep data fresh — but don't block UI
    const fetchCVs = async () => {
      dispatch(setCvLoading(true));
      try {
        const result = await apiService.cvs.getAll();
        if (result?.cvs) {
          dispatch(setCvs(result.cvs));
        }
      } catch (error) {
        console.error("Error fetching CVs:", error);
        router.replace("/error");
      } finally {
        dispatch(setCvLoading(false));
      }
    };

    if (cvs.length === 0) {
      fetchCVs();
    } else {
      fetchCVs();
    }
  }, [dispatch, router]);

  const openPopOver = (name: string, id?: string) => {
    setCurrentPopOver(name);
    if (id) setCurrentId(id);
  };

  const closePopOver = () => setCurrentPopOver("");

  const handleAddCv = (cv: CV) => dispatch(addCv(cv));
  const handleRemoveCv = (id: string) => dispatch(removeCv(id));

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            className="border rounded-lg pr-6 shadow-md hover:shadow-lg flex flex-row justify-between items-center"
          >
            <div
              className="text-black text-3xl mb-4 w-full cursor-pointer py-6 pl-6"
              onClick={() =>
                router.push(`/builder/?cvId=${cv.id}&cvTemplate=${cv.template}`)
              }
            >
              {cv.title}
            </div>
            <button
              onClick={() => openPopOver("delete", cv.id)}
              className="hover:text-red-700 text-red-500 py-1 px-3 rounded text-sm"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

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
        <CreatePopOver closePopOver={closePopOver} addCv={handleAddCv} />
      )}

      {currentPopOver === "delete" && (
        <DeletePopOver id={currentId} closePopOver={closePopOver} removeCv={handleRemoveCv} />
      )}
    </div>
  );
}
