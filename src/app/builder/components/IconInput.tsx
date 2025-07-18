"use client"

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  User,
  X
} from 'lucide-react';

type IconOption = {
  name: string;
  icon: React.ReactNode;
};

const iconOptions: IconOption[] = [
  { name: 'Email', icon: <Mail size={18} /> },
  { name: 'Phone', icon: <Phone size={18} /> },
  { name: 'Website', icon: <Globe size={18} /> },
  { name: 'Location', icon: <MapPin size={18} /> },
  { name: 'Work', icon: <Briefcase size={18} /> },
  { name: 'Education', icon: <GraduationCap size={18} /> },
  { name: 'Person', icon: <User size={18} /> },
];

interface IconInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onIconChange?: (iconName: string) => void;
}

export default function IconInput({ 
  placeholder = "Enter text", 
  value = "", 
  onChange,
  onIconChange
}: IconInputProps) {
  const [text, setText] = useState(value);
  const [selectedIcon, setSelectedIcon] = useState<IconOption>(iconOptions[0]);
  const [showIconSelector, setShowIconSelector] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    if (onChange) onChange(newValue);
  };

  const handleIconSelect = (icon: IconOption) => {
    setSelectedIcon(icon);
    setShowIconSelector(false);
    if (onIconChange) onIconChange(icon.name);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center w-full border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <button 
          type="button"
          onClick={() => setShowIconSelector(!showIconSelector)}
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

      {showIconSelector && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
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
      )}
    </div>
  );
}