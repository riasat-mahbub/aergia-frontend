"use client"

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { IconOption, iconOptions } from './FormHolderCard';
import { createPortal } from 'react-dom';

interface IconInputProps {
  placeholder?: string;
  value?: string;
  iconValue?: string;
  onChange?: (value: string) => void;
  onIconChange?: (iconName: string) => void;
}

export default function IconInput({ 
  placeholder = "Enter text", 
  value = "", 
  iconValue = "Email",
  onChange,
  onIconChange
}: IconInputProps) {
  const [text, setText] = useState(value);
  const [selectedIcon, setSelectedIcon] = useState<IconOption>(
    iconOptions.find(icon => icon.name === iconValue) || iconOptions[0]
  );
  // const [showIconSelector, setShowIconSelector] = useState(false);
  
  // Update text and icon when props change
  useEffect(() => {
    setText(value);
  }, [value]);
  
  useEffect(() => {
    const icon = iconOptions.find(icon => icon.name === iconValue);
    if (icon) setSelectedIcon(icon);
  }, [iconValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    if (onChange) onChange(newValue);
  };

  const handleIconSelect = (icon: IconOption) => {
    setSelectedIcon(icon);
    // setShowIconSelector(false);
    if (onIconChange) onIconChange(icon.name);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <button 
          type="button"
          // onClick={() => setShowIconSelector(!showIconSelector)}
          className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Select icon"
        >
          {selectedIcon.icon}
        </button>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder}
          className="flex-1 p-2 outline-none"
        />
      </div>

    {/* {showIconSelector &&
      createPortal(
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute mt-1 w-64 bg-white border rounded-md shadow-lg">
            <div className="flex justify-between items-center p-2 border-b">
              <button 
                onClick={() => setShowIconSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon.name}
                  onClick={() => handleIconSelect(icon)}
                  className={`p-2 flex flex-col items-center justify-center rounded hover:bg-gray-100 ${
                    selectedIcon.name === icon.name ? 'bg-blue-100' : ''
                  }`}
                >
                  {icon.icon}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )
    } */}
    </div>
  );
}