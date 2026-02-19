import { useState } from "react";
import { X } from "lucide-react";
import { FORM_TEMPLATES } from "../FormHolderCard/FormTemplates";
import { useFormHolders } from "@/hooks/useFormHolders";

interface AddFormHolderPopoverProps {
  onClose: () => void;
}

export default function AddFormHolderPopover({ onClose }: AddFormHolderPopoverProps) {
  const { saveFormHolder } = useFormHolders();
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] = useState(FORM_TEMPLATES[0].type);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || loading) return;

    setLoading(true);
    
    try {
      await saveFormHolder(title, selectedType);
      onClose();
    } catch (err) {
      console.error("Failed to save form holder:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Add New Section</h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              placeholder="e.g., Work Experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50"
            >
              {FORM_TEMPLATES.map((template) => (
                <option key={template.type} value={template.type}>
                  {template.label}
                </option>
              ))}
            </select>
          </div>


          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={loading || !title.trim()}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
