'use client'
import { useEffect, useState } from 'react';
import { ChevronDown, Mail, Phone, Globe, MapPin, User, Briefcase, GraduationCap, Star, Heart, Home, Building, X } from 'lucide-react';

interface IconPickerProps {
  selectedIcon?: string;
  onIconChange: (selectedIcon:string)=> void;
}

export const IconMap = [
  { name: 'Mail', icon: Mail },
  { name: 'Phone', icon: Phone },
  { name: 'Globe', icon: Globe },
  { name: 'MapPin', icon: MapPin },
  { name: 'User', icon: User },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'Star', icon: Star },
  { name: 'Heart', icon: Heart },
  { name: 'Home', icon: Home },
  { name: 'Building', icon: Building },
];

export default function IconPicker({ selectedIcon="XSquare", onIconChange}: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIconData, setSelectedIconData] = useState(IconMap.find(icon => icon.name === selectedIcon) || { name: 'X', icon: X },)

  useEffect( () =>{
    setSelectedIconData(IconMap.find(icon => icon.name === selectedIcon) || { name: 'X', icon: X })
  }, [selectedIcon])
  
  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1 p-3 w-full sm:w-auto border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        {selectedIconData?.icon ? (
          <selectedIconData.icon size={18} />
        ) : (
          <div className="w-4 h-4 border border-dashed border-gray-400 rounded" />
        )}
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-56 sm:w-64 bg-white border rounded-lg shadow-lg z-20 p-3 max-h-[50vh] overflow-y-auto 
          grid grid-cols-5 sm:grid-cols-6 gap-2 transition-all duration-200"
        >
          {/* Clear Icon Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onIconChange('');
            }}
            className={` hover:bg-gray-100 rounded flex items-center justify-center ${
              selectedIcon === '' ? 'bg-blue-100' : ''
            }`}
            title="Clear"
          >
            <X size={18} />
          </button>

          {/* Icon Options */}
          {IconMap.map(({ name, icon: IconComponent }) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                setIsOpen(false);
                onIconChange(name);
              }}
              className={` hover:bg-gray-100 rounded flex items-center justify-center ${
                selectedIcon === name ? 'bg-blue-100' : ''
              }`}
              title={name}
            >
              <IconComponent size={18} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}