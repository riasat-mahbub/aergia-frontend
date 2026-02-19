import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormHolder } from '@/store/formSlice';
import { FormHolder, DateFormat } from '@/types/FormHolderTypes';
import { useFormHolders } from '@/hooks/useFormHolders';
import {
  ChevronDown,
  ChevronRight,
  Save,
  Type,
  Calendar,
} from 'lucide-react';
import {
  getStyleElementsForType,
  StyleElement,
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  FONT_STYLES,
  TEXT_DECORATIONS,
  TEXT_TRANSFORMS,
  TEXT_ALIGNMENTS,
  PRESET_COLORS,
} from '@/constants/styleElements';
import { DATE_FORMATS, getDefaultDateFormat } from '@/utils/dateUtils';

interface SectionStyleEditorProps {
  formHolder: FormHolder;
}

export default function SectionStyleEditor({ formHolder }: SectionStyleEditorProps) {
  const dispatch = useDispatch();
  const { updateFormHolder: saveFormHolder } = useFormHolders();

  const [expandedElements, setExpandedElements] = useState<Set<string>>(new Set(['.title']));
  const [activeTab, setActiveTab] = useState<'style' | 'date'>('style');
  const [isSaving, setIsSaving] = useState(false);
  const [localStyle, setLocalStyle] = useState(formHolder.style || {});
  const [localDateFormat, setLocalDateFormat] = useState<DateFormat>(
    formHolder.dateFormat || getDefaultDateFormat()
  );

  const styleElements = getStyleElementsForType(formHolder.type);

  const toggleElement = useCallback((selector: string) => {
    setExpandedElements((prev) => {
      const next = new Set(prev);
      if (next.has(selector)) {
        next.delete(selector);
      } else {
        next.add(selector);
      }
      return next;
    });
  }, []);

  const handleStyleChange = useCallback(
    (selector: string, property: string, value: string) => {
      const fullSelector = `.th-${formHolder.id} ${selector}`;
      setLocalStyle((prev) => ({
        ...prev,
        [fullSelector]: {
          ...(prev[fullSelector] || {}),
          [property]: value,
        },
      }));
    },
    [formHolder.id]
  );

  const getStyleValue = useCallback(
    (selector: string, property: string): string => {
      const fullSelector = `.th-${formHolder.id} ${selector}`;
      return (localStyle[fullSelector]?.[property] as string) || '';
    },
    [formHolder.id, localStyle]
  );

  const handleSave = async () => {
    setIsSaving(true);
    const updated = {
      ...formHolder,
      style: localStyle,
      dateFormat: localDateFormat,
    };
    dispatch(updateFormHolder(updated));
    await saveFormHolder(updated);
    setIsSaving(false);
  };

  const renderStyleControls = (element: StyleElement) => {
    return (
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Font Family</label>
            <select
              value={getStyleValue(element.selector, 'font-family') || 'Arimo'}
              onChange={(e) => handleStyleChange(element.selector, 'font-family', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Font Size</label>
            <select
              value={getStyleValue(element.selector, 'font-size') || '10px'}
              onChange={(e) => handleStyleChange(element.selector, 'font-size', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Font Weight</label>
            <select
              value={getStyleValue(element.selector, 'font-weight') || 'normal'}
              onChange={(e) => handleStyleChange(element.selector, 'font-weight', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {FONT_WEIGHTS.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Font Style</label>
            <select
              value={getStyleValue(element.selector, 'font-style') || 'normal'}
              onChange={(e) => handleStyleChange(element.selector, 'font-style', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {FONT_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={getStyleValue(element.selector, 'color') || '#000000'}
              onChange={(e) => handleStyleChange(element.selector, 'color', e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={getStyleValue(element.selector, 'color') || '#000000'}
              onChange={(e) => handleStyleChange(element.selector, 'color', e.target.value)}
              className="flex-1 p-2 text-xs border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {PRESET_COLORS.slice(0, 8).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleStyleChange(element.selector, 'color', color)}
                className={`w-5 h-5 rounded border transition-transform hover:scale-110 ${
                  getStyleValue(element.selector, 'color') === color
                    ? 'border-gray-800 ring-1 ring-gray-400'
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Text Decoration</label>
            <select
              value={getStyleValue(element.selector, 'text-decoration') || 'none'}
              onChange={(e) => handleStyleChange(element.selector, 'text-decoration', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {TEXT_DECORATIONS.map((decor) => (
                <option key={decor.value} value={decor.value}>
                  {decor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Text Transform</label>
            <select
              value={getStyleValue(element.selector, 'text-transform') || 'none'}
              onChange={(e) => handleStyleChange(element.selector, 'text-transform', e.target.value)}
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
            >
              {TEXT_TRANSFORMS.map((transform) => (
                <option key={transform.value} value={transform.value}>
                  {transform.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Text Align</label>
          <select
            value={getStyleValue(element.selector, 'text-align') || 'left'}
            onChange={(e) => handleStyleChange(element.selector, 'text-align', e.target.value)}
            className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500"
          >
            {TEXT_ALIGNMENTS.map((align) => (
              <option key={align.value} value={align.value}>
                {align.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-700">Style Editor</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
        >
          <Save size={14} />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="flex gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
            activeTab === 'style'
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Type size={14} />
          Typography
        </button>
        <button
          onClick={() => setActiveTab('date')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
            activeTab === 'date'
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar size={14} />
          Date Format
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === 'style' && (
          <div className="space-y-1">
            {styleElements.map((element) => (
              <div key={element.selector} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleElement(element.selector)}
                  className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">{element.label}</span>
                  {expandedElements.has(element.selector) ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </button>
                {expandedElements.has(element.selector) && (
                  <div className="p-2 bg-white border-t border-gray-200">
                    {renderStyleControls(element)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'date' && (
          <div className="space-y-4 p-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format for this Section
              </label>
              <select
                value={localDateFormat}
                onChange={(e) => setLocalDateFormat(e.target.value as DateFormat)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {DATE_FORMATS.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.name} ({format.example})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <p className="text-sm font-medium text-gray-700">
                {(() => {
                  const month = '01';
                  const year = '2024';
                  switch (localDateFormat) {
                    case 'mm-yyyy':
                      return `${month}-${year}`;
                    case 'dd-mm-yyyy':
                      return `15-${month}-${year}`;
                    case 'dd-mm-yy':
                      return `15-${month}-24`;
                    case 'month_name-yyyy':
                      return `January ${year}`;
                    case 'mon-yyyy':
                      return `Jan ${year}`;
                    case 'yyyy':
                      return year;
                    default:
                      return `${month}-${year}`;
                  }
                })()}
              </p>
            </div>

            <p className="text-xs text-gray-400">
              This format will be applied to all date fields in this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
