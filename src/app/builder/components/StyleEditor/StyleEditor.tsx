'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormHolder } from "@/types/FormHolderTypes";
import { updateFormHolder } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";

interface StyleEditorProps {
  formHolder: FormHolder;
  onClose: () => void;
}

export default function StyleEditor({ formHolder, onClose }: StyleEditorProps) {
  const dispatch = useDispatch();
  const cvId = useSelector((state: RootState) => state.forms.cvId);
  const { updateFormHolder: updateFormHolderAPI } = useFormHolders(cvId);
  
  const [styleData, setStyleData] = useState<Record<string, Record<string, any>>>(formHolder.style as Record<string, Record<string, any>> || {});
  const [loading, setLoading] = useState(false);

  const handleStyleChange = (componentKey: string, property: string, value: string) => {
    setStyleData(prev => ({
      ...prev,
      [componentKey]: {
        ...(prev[componentKey] || {}),
        [property]: value
      }
    }));
  };

  const flexboxProperties = ['display', 'flexDirection', 'justifyContent', 'alignItems', 'flexWrap', 'flex', 'flexGrow', 'flexShrink', 'flexBasis'];

  const isFlexboxOnlyObject = (obj: Record<string, any>) => {
    const keys = Object.keys(obj);
    return keys.length > 0 && keys.every(key => flexboxProperties.includes(key));
  };

  const getInputType = (componentKey: string, property: string, value: any) => {
    if (property === 'fontWeight') {
      return (
        <select
          value={value || ''}
          onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select weight</option>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </select>
      );
    }
    if (property === 'textAlign') {
      return (
        <select
          value={value || ''}
          onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select alignment</option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      );
    }
    if (property === 'color') {
      return (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={value || ''}
            disabled={true}
            onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-neutral-200"
            placeholder="#000000 or color name"
          />
        </div>
      );
    }
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={`Enter ${property}`}
      />
    );
  };

  const handleSave = async () => {
    if (!cvId) return;

    setLoading(true);
    try {
      const updatedFormHolder = { ...formHolder, style: styleData };
      await updateFormHolderAPI(updatedFormHolder);
      dispatch(updateFormHolder(updatedFormHolder));
      onClose();
    } catch (error) {
      console.error("Failed to update style:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl max-h-screen mx-auto my-8 px-4 overflow-scroll">

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="space-y-6">
            {Object.entries(styleData)
              .filter(([, componentStyles]) => !isFlexboxOnlyObject(componentStyles as Record<string, any>))
              .map(([componentKey, componentStyles]) => (
              <div key={componentKey} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 capitalize">{componentKey}</h3>
                <div className="space-y-2">
                  {Object.entries(componentStyles as Record<string, any>)
                    .filter(([property]) => !flexboxProperties.includes(property))
                    .map(([property, value]) => (
                      <div key={`${componentKey}-${property}`} className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                          {property}
                        </label>
                        {getInputType(componentKey, property, value)}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}