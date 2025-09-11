"use client"

import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePopOver from "./createPopOver";
import Spinner from "@/components/Spinner";
import { CV } from "@/types/CvTypes";
import { Plus, Trash2 } from "lucide-react";



export default function CVsPage() {
  const [cvs, setCvs] = useState<CV[]>([]);
 
  const [isPopOverOpen, setIsPopOverOpen] = useState(false)

  const { execute, loading, error } = useApi();
  const router = useRouter();

  useEffect(() => {
    if(!isPopOverOpen){
      const fetchCVs = async () => {
        const result = await execute(() => apiService.cvs.getAll());
        if (result) {
          setCvs(result.cvs);
        }
      };
      fetchCVs();
    }
  }, []);


  const openPopOver = () => {
    setIsPopOverOpen(true);
  };

  const closePopOver = () =>{
    setIsPopOverOpen(false)
  } 

  const addCV = (cv: CV) => {
    setCvs([...cvs, cv])
  }
  

  const handleDeleteCV = async (id: string) => {
    const result = await execute(() => apiService.cvs.delete(id));
    if (result) {
      setCvs(cvs.filter(cv => cv.id !== id));
    }
  };

  if (loading) return <Spinner/>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My CVs</h1>
        <button
          onClick={openPopOver}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-full"
        >
           <Plus></Plus>
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cvs.map((cv) => (
          <div key={cv.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg flex flex-row justify-between items-center" >
            
            <div className="text-black text-3xl mb-4 w-full cursor-pointer" onClick={() => router.push(`/builder/${cv.id}`)}>
              {cv.title}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteCV(cv.id)}
                className="hover:text-red-700 text-red-500 border-black  py-1 px-3 rounded text-sm cursor-pointer"
              >
                <Trash2></Trash2>
              </button>
            </div>
          </div>
        ))}
      </div>

      {cvs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No CVs found</p>
          <button
            onClick={openPopOver}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Your First CV
          </button>
        </div>
      )}

      {isPopOverOpen &&
        <CreatePopOver closePopOver={closePopOver} addCv={addCV}/>
      }
    </div>
  );
}