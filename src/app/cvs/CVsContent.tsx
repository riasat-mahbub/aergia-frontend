"use client"

import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePopOver from "./createPopOver";
import Spinner from "@/components/Spinner";
import { CV } from "@/types/CvTypes";
import { Plus, Trash2 } from "lucide-react";
import DeletePopOver from "./deletePopOver";

export default function CVsContent() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [currentPopOver, setCurrentPopOver] = useState('')
  const [ currentId, setCurrentId] = useState('')

  const { execute, loading, error } = useApi();
  const router = useRouter();

  useEffect(() => {
    const fetchCVs = async () => {
      const result = await execute(() => apiService.cvs.getAll());
      if (result) {
        setCvs(result.cvs);
      }
    };
    fetchCVs();
  }, []);


  const openPopOver = (popoverName: string) => {
    setCurrentPopOver(popoverName);
  };

  const closePopOver = () =>{
    setCurrentPopOver('')
  } 

  const addCV = (cv: CV) => {
    setCvs([...cvs, cv])
  }

  const removeCV = (id: string) => {
    setCvs(cvs.filter(cv => cv.id !== id))
  }
  

  if (loading) return <Spinner/>

  if (error){
    router.replace('/error')
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My CVs</h1>
        <button
          onClick={() => openPopOver('create')}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-full"
        >
            <Plus className="cursor-pointer"></Plus>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cvs.map((cv) => (
          <div key={cv.id} className="border rounded-lg pr-6 shadow-md hover:shadow-lg flex flex-row justify-between items-center" >
            
            <div className="text-black text-3xl mb-4 w-full cursor-pointer py-6 pl-6" onClick={() => router.push(`/builder/?cvId=${cv.id}&cvTemplate=${cv.template}`)}>
              {cv.title}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {openPopOver('delete'); setCurrentId(cv.id); }}
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
            onClick={() => openPopOver('create')}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Create Your First CV
          </button>
        </div>
      )}

      {currentPopOver==='create' &&
        <CreatePopOver closePopOver={closePopOver} addCv={addCV}/>
      }

      {currentPopOver==='delete' &&
        <DeletePopOver id={currentId} closePopOver={closePopOver} removeCv={removeCV}/>
      }
    </div>
  );
}