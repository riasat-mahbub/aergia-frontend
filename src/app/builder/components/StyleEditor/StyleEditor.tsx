'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Styles } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { FormHolder } from "@/types/FormHolderTypes";
import { updateFormHolder } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";

interface StyleEditorProps {
  formHolder: FormHolder;
  onClose: () => void;
}

type StyleValue = string | number;

const FLEXBOX_PROPERTIES = [
  'display', 
  'flexDirection', 
  'justifyContent', 
  'alignItems', 
  'flexWrap', 
  'flex', 
  'flexGrow', 
  'flexShrink', 
  'flexBasis'
] as const;

const FONT_WEIGHTS = [
  { value: '', label: 'Select weight' },
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: '100', label: '100' },
  { value: '200', label: '200' },
  { value: '300', label: '300' },
  { value: '400', label: '400' },
  { value: '500', label: '500' },
  { value: '600', label: '600' },
  { value: '700', label: '700' },
  { value: '800', label: '800' },
  { value: '900', label: '900' },
] as const;

const TEXT_ALIGNMENTS = [
  { value: '', label: 'Select alignment' },
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
] as const;

export default function StyleEditor({ formHolder, onClose }: StyleEditorProps) {
  const dispatch = useDispatch();
  const { updateFormHolder: updateFormHolderAPI } = useFormHolders();
  
  const [styleData, setStyleData] = useState<Styles>(
    (formHolder.style as Styles) || {}
  );
  const [loading, setLoading] = useState(false);

  const handleStyleChange = (componentKey: string, property: string, value: string) => {
    setStyleData(prev => ({
      ...prev,
      [componentKey]: {
        ...(prev[componentKey] || {}),
        [property]: value
      } as Style
    }));
  };

  const isFlexboxOnlyObject = (styleObj: Style): boolean => {
    const keys = Object.keys(styleObj).filter(key => !key.startsWith('@media'));
    return keys.length > 0 && keys.every(key => FLEXBOX_PROPERTIES.includes(key as typeof FLEXBOX_PROPERTIES[number]));
  };

  const renderFontWeightInput = (componentKey: string, property: string, value: StyleValue) => (
    <select
      value={String(value || '')}
      onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {FONT_WEIGHTS.map(({ value: optValue, label }) => (
        <option key={optValue} value={optValue}>{label}</option>
      ))}
    </select>
  );

  const renderTextAlignInput = (componentKey: string, property: string, value: StyleValue) => (
    <select
      value={String(value || '')}
      onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {TEXT_ALIGNMENTS.map(({ value: optValue, label }) => (
        <option key={optValue} value={optValue}>{label}</option>
      ))}
    </select>
  );

  const renderColorInput = (componentKey: string, property: string, value: StyleValue) => (
    <div className="flex-1 flex items-center gap-2">
      <input
        type="color"
        value={String(value || '#000000')}
        onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
      />
      <input
        type="text"
        value={String(value || '')}
        disabled={true}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-neutral-200"
        placeholder="#000000 or color name"
      />
    </div>
  );

  const renderTextInput = (componentKey: string, property: string, value: StyleValue) => (
    <input
      type="text"
      value={String(value || '')}
      onChange={(e) => handleStyleChange(componentKey, property, e.target.value)}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      placeholder={`Enter ${property}`}
    />
  );

  const getInputType = (componentKey: string, property: string, value: StyleValue) => {
    switch (property) {
      case 'fontWeight':
        return renderFontWeightInput(componentKey, property, value);
      case 'textAlign':
        return renderTextAlignInput(componentKey, property, value);
      case 'color':
        return renderColorInput(componentKey, property, value);
      default:
        return renderTextInput(componentKey, property, value);
    }
  };

  const handleSave = async () => {
    if (!formHolder) return;

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

  const filteredStyleEntries = Object.entries(styleData)
    .filter(([, componentStyle]) => {
      return componentStyle && !isFlexboxOnlyObject(componentStyle);
    });

  return (
    <div className="w-full max-w-4xl max-h-screen mx-auto my-8 px-4 overflow-scroll">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="space-y-6">
            {filteredStyleEntries.map(([componentKey, componentStyle]) => (
              <div key={componentKey} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 capitalize">{componentKey}</h3>
                <div className="space-y-2">
                  {Object.entries(componentStyle)
                    .filter(([property]) => 
                      !property.startsWith('@media') && 
                      !FLEXBOX_PROPERTIES.includes(property as typeof FLEXBOX_PROPERTIES[number])
                    )
                    .map(([property, value]) => (
                      <div key={`${componentKey}-${property}`} className="flex items-center gap-4">
                        <label className="w-32 text-sm font-medium text-gray-700">
                          {property}
                        </label>
                        {getInputType(componentKey, property, value as StyleValue)}
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