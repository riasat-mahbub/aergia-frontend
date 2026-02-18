// import { useState, useRef, useEffect } from "react";
// import * as LucideIcons from "lucide-react";

// interface IconInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   className?: string;
// }

// const COMMON_ICONS = [
//   "Mail",
//   "Phone",
//   "Globe",
//   "MapPin",
//   "User",
//   "Briefcase",
//   "GraduationCap",
//   "Star",
//   "Heart",
//   "Home",
//   "Building",
//   "Calendar",
//   "Clock",
//   "Link",
//   "Github",
//   "Linkedin",
//   "Twitter",
//   "Award",
//   "Book",
//   "Code",
//   "FileText",
//   "Folder",
//   "Image",
//   "Music",
//   "Video",
//   "Download",
//   "Upload",
//   "Search",
//   "Settings",
//   "Tool",
// ];

// export default function IconInput({
//   value,
//   onChange,
//   placeholder = "Search or select icon...",
//   className = "",
// }: IconInputProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const containerRef = useRef<HTMLDivElement>(null);

//   const filteredIcons = COMMON_ICONS.filter((name) =>
//     name.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const renderIcon = (iconName: string) => {
//     const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[iconName];
//     return IconComponent ? <IconComponent size={18} /> : null;
//   };

//   const SelectedIcon = value
//     ? (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[value]
//     : null;

//   return (
//     <div ref={containerRef} className={`relative ${className}`}>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
//       >
//         {SelectedIcon ? (
//           <>
//             <SelectedIcon size={18} />
//             <span className="text-gray-700">{value}</span>
//           </>
//         ) : (
//           <span className="text-gray-400">{placeholder}</span>
//         )}
//         <LucideIcons.ChevronDown size={16} className="ml-auto text-gray-400" />
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
//           <div className="p-2 border-b border-gray-200">
//             <div className="relative">
//               <LucideIcons.Search
//                 size={16}
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search icons..."
//                 className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
//                 autoFocus
//               />
//             </div>
//           </div>

//           <div className="overflow-y-auto max-h-48 p-2">
//             {filteredIcons.length > 0 ? (
//               <div className="grid grid-cols-5 gap-1">
//                 {filteredIcons.map((iconName) => {
//                   const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number }>>)[iconName];
//                   if (!IconComponent) return null;

//                   return (
//                     <button
//                       key={iconName}
//                       type="button"
//                       onClick={() => {
//                         onChange(iconName);
//                         setIsOpen(false);
//                         setSearch("");
//                       }}
//                       className={`p-2 rounded hover:bg-gray-100 flex flex-col items-center justify-center ${
//                         value === iconName ? "bg-emerald-100 text-emerald-600" : "text-gray-600"
//                       }`}
//                       title={iconName}
//                     >
//                       <IconComponent size={20} />
//                     </button>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center text-gray-400 py-4 text-sm">
//                 No icons found
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
