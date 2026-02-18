import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Heart, 
  Home, 
  Building,
  Folder,
  Award,
  Trophy,
  Book,
  Plus,
  X
} from "lucide-react";

interface IconOptionsProps {
  icon?: string;
  size?: number;
}

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Home,
  Building,
  Folder,
  Award,
  Trophy,
  Book,
  Plus,
};

export default function IconOptions({ icon, size = 20 }: IconOptionsProps) {
  if (!icon || !iconMap[icon]) {
    return (
      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
        <X size={size} className="text-gray-400" />
      </div>
    );
  }


  return (
    <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
      {/* <IconComponent size={size} className="text-emerald-600" /> */}
    </div>
  );
}

export { iconMap };
