"use client";

import { X, Check } from "lucide-react";
import { useCVs } from "@/hooks/useCVs";
import { useState } from "react";

interface DeletePopOverProps {
  id: string;
  closePopOver: () => void;
}

export default function DeletePopOver({ id, closePopOver }: DeletePopOverProps) {
  const { deleteCv } = useCVs();
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteCV = async () => {
    if (deleting) return;
    setDeleting(true);
    setErrorMessage("");

    try {
      await deleteCv(id);
      closePopOver();
    } catch (err) {
      console.error("Failed to delete CV:", err);
      setErrorMessage("Something went wrong while deleting this CV.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Delete this CV?</h3>
          <button
            onClick={closePopOver}
            disabled={deleting}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone. Are you sure you want to delete this CV?
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={closePopOver}
            disabled={deleting}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCV}
            disabled={deleting}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {deleting ? "Deleting..." : (
              <>
                <Check size={16} /> Confirm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
