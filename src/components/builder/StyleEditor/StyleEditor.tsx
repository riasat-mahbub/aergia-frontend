import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateFormHolder } from "@/store/formSlice";
import {
  setThemeColor,
  setFontFamily,
  setFontSize,
  DEFAULT_THEME_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
} from "@/store/settingSlice";
import { FormHolder } from "@/types/FormHolderTypes";
import { X, Palette, Type, Move, RotateCcw } from "lucide-react";

interface StyleEditorProps {
  formHolder: FormHolder;
  onClose: () => void;
}

const FONT_FAMILIES = [
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "Poppins", value: "Poppins" },
  { name: "Raleway", value: "Raleway" },
  { name: "Merriweather", value: "Merriweather" },
];

const FONT_SIZES = [
  { name: "Extra Small", value: "9" },
  { name: "Small", value: "10" },
  { name: "Medium", value: "11" },
  { name: "Large", value: "12" },
  { name: "Extra Large", value: "14" },
];

const SPACING_OPTIONS = [
  { name: "Compact", value: "0.5" },
  { name: "Normal", value: "1" },
  { name: "Relaxed", value: "1.5" },
  { name: "Spacious", value: "2" },
];

export default function StyleEditor({ formHolder, onClose }: StyleEditorProps) {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const [activeTab, setActiveTab] = useState<"fonts" | "colors" | "spacing">("fonts");

  const handleColorChange = (color: string) => {
    dispatch(setThemeColor(color));
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    dispatch(setFontFamily(fontFamily));
  };

  const handleFontSizeChange = (fontSize: string) => {
    dispatch(setFontSize(fontSize));
  };

  const handleSpacingChange = (spacing: string) => {
    const updatedStyle = {
      ...formHolder.style,
      section: {
        ...formHolder.style?.section,
        marginBottom: `${spacing}rem`,
      },
    };
    dispatch(
      updateFormHolder({
        ...formHolder,
        style: updatedStyle,
      })
    );
  };

  const handleReset = () => {
    dispatch(setThemeColor(DEFAULT_THEME_COLOR));
    dispatch(setFontFamily(DEFAULT_FONT_FAMILY));
    dispatch(setFontSize(DEFAULT_FONT_SIZE));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Style Editor</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("fonts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "fonts"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Type size={18} />
          Fonts
        </button>
        <button
          onClick={() => setActiveTab("colors")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "colors"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Palette size={18} />
          Colors
        </button>
        <button
          onClick={() => setActiveTab("spacing")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "spacing"
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Move size={18} />
          Spacing
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "fonts" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {activeTab === "colors" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themeColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.themeColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preset Colors
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[
                  "#10b981",
                  "#3b82f6",
                  "#8b5cf6",
                  "#ec4899",
                  "#f59e0b",
                  "#ef4444",
                  "#06b6d4",
                  "#84cc16",
                  "#6366f1",
                  "#f97316",
                  "#14b8a6",
                  "#a855f7",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${
                      settings.themeColor === color
                        ? "border-gray-800"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "spacing" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Spacing
            </label>
            <div className="grid grid-cols-2 gap-3">
              {SPACING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSpacingChange(option.value)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formHolder.style?.section?.marginBottom === `${option.value}rem`
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw size={18} />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
