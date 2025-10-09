"use client";

import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCVs } from "@/hooks/useCVs";

interface PopOverProps {
  id: string;
  closePopOver: () => void;
}

export default function DeletePopOver({ id, closePopOver }: PopOverProps) {
  const router = useRouter();
  const { loading, error, deleteCv } = useCVs();

  const handleDeleteCV = async () => {
    if (loading) return;

    if (error) {
      router.replace("/error");
      return;
    }

      try {
      await deleteCv(id);
      closePopOver();
    } catch (error) {
      console.error("Delete failed:", error);
      router.replace("/error");
    } 
  };

  return (
    <div className="flex flex-col fixed inset-0 backdrop-blur-sm items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="text-16 font-bold">Delete this CV?</div>

          <X
            className={`cursor-pointer ml-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={loading ? undefined : closePopOver}
          />
        </div>

        <div className="flex flex-row justify-between mt-10 w-full">
          <button
            className="bg-red-500 p-2 rounded-lg text-white cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDeleteCV}
            disabled={loading}
          >
            {loading ? "Deleting..." : <Check />}
          </button>
          <button
            className="bg-emerald-500 p-2 rounded-lg text-white cursor-pointer hover:bg-emerald-700 disabled:opacity-50"
            onClick={closePopOver}
            disabled={loading}
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
