import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateFormHolder } from '@/store/formSlice';
import { FormHolder } from '@/types/FormHolderTypes';
import { Type, Palette, Move } from 'lucide-react';

interface SectionStyleEditorProps {
  formHolder: FormHolder;
}

const FONT_FAMILIES = [
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Merriweather', value: 'Merriweather' },
];

const FONT_SIZES = [
  { name: 'Extra Small', value: '9' },
  { name: 'Small', value: '10' },
  { name: 'Medium', value: '11' },
  { name: 'Large', value: '12' },
  { name: 'Extra Large', value: '14' },
];

const SPACING_OPTIONS = [
  { name: 'Compact', value: '0.5' },
  { name: 'Normal', value: '1' },
  { name: 'Relaxed', value: '1.5' },
  { name: 'Spacious', value: '2' },
];

export default function SectionStyleEditor({ formHolder }: SectionStyleEditorProps) {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const [activeTab, setActiveTab] = useState<'fonts' | 'colors' | 'spacing'>('fonts');

  const currentStyle = formHolder.style || {};

  const handleStyleChange = (property: string, value: string) => {
    const selector = `.th-${formHolder.id}`;
    const updatedStyle = {
      ...currentStyle,
      [selector]: {
        ...(currentStyle[selector] || {}),
        [property]: value,
      },
    };
    dispatch(
      updateFormHolder({
        ...formHolder,
        style: updatedStyle,
      })
    );
  };

  const getStyleValue = (property: string): string => {
    const selector = `.th-${formHolder.id}`;
    return (currentStyle[selector]?.[property] as string) || '';
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('fonts')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeTab === 'fonts'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Type size={16} />
          Fonts
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeTab === 'colors'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Palette size={16} />
          Colors
        </button>
        <button
          onClick={() => setActiveTab('spacing')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeTab === 'spacing'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Move size={16} />
          Spacing
        </button>
      </div>

      {activeTab === 'fonts' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Font Family
            </label>
            <select
              value={getStyleValue('font-family') || settings.fontFamily}
              onChange={(e) => handleStyleChange('font-family', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Font Size
            </label>
            <select
              value={getStyleValue('font-size') || `${settings.fontSize}px`}
              onChange={(e) => handleStyleChange('font-size', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={`${size.value}px`}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={getStyleValue('color') || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={getStyleValue('color') || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Section Title Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={getStyleValue('.sectionTitle color') || settings.themeColor}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={getStyleValue('.sectionTitle color') || settings.themeColor}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Preset Colors
            </label>
            <div className="grid grid-cols-6 gap-2">
              {[
                '#000000',
                '#374151',
                '#10b981',
                '#3b82f6',
                '#8b5cf6',
                '#ec4899',
                '#f59e0b',
                '#ef4444',
                '#06b6d4',
                '#84cc16',
                '#6366f1',
                '#f97316',
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => handleStyleChange('color', color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
                    getStyleValue('color') === color
                      ? 'border-gray-800'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'spacing' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Section Spacing
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SPACING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStyleChange('margin-bottom', `${option.value}rem`)}
                  className={`p-2.5 rounded-lg border-2 text-sm transition-colors ${
                    getStyleValue('margin-bottom') === `${option.value}rem`
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Padding
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.25"
              value={parseFloat(getStyleValue('padding') || '0')}
              onChange={(e) => handleStyleChange('padding', `${e.target.value}rem`)}
              className="w-full"
            />
            <div className="text-sm text-gray-500 text-center mt-1">
              {getStyleValue('padding') || '0rem'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
