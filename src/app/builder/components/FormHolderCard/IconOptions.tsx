import { Mail, Phone, Star, Globe, Library, FolderOpen, Briefcase, GraduationCap, User } from "lucide-react";

export type IconOption = {
  name: string;
  icon: React.ReactNode;
};

export const iconOptions: IconOption[] = [
  { name: "Email", icon: <Mail size={18} /> },
  { name: "Phone", icon: <Phone size={18} /> },
  { name: "Star", icon: <Star size={18}/> },
  { name: "Globe", icon: <Globe size={18}/> },
  { name: "Library", icon: <Library size={18} /> },
  { name: "Folder", icon: <FolderOpen size={18} /> },
  { name: "Briefcase", icon: <Briefcase size={18} /> },
  { name: "GraduationCap", icon: <GraduationCap size={18} /> },
  { name: "Person", icon: <User size={18} /> },
];