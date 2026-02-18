import { X, Check } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFormHolder } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";

interface DeleteFormHolderPopoverProps {
  formHolderId: string;
  onClose: () => void;
}

export default function DeleteFormHolderPopover({ formHolderId, onClose }: DeleteFormHolderPopoverProps) {
  const dispatch = useDispatch();
  const { deleteFormHolder: deleteFromApi } = useFormHolders();
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setErrorMessage("");

    try {
      dispatch(deleteFormHolder(formHolderId));
      await deleteFromApi(formHolderId);
      onClose();
    } catch (err) {
      console.error("Failed to delete form holder:", err);
      setErrorMessage("Something went wrong while deleting this section.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Delete Section?</h3>
          <button
            onClick={onClose}
            disabled={deleting}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          This will delete this section and all its content. This action cannot be undone.
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
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
