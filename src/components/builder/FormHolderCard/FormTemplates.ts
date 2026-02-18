export interface FormTemplate {
  type: string;
  label: string;
  icon: string;
  description: string;
}

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    type: "profile",
    label: "Profile",
    icon: "User",
    description: "Personal information and summary"
  },
  {
    type: "experience",
    label: "Experience",
    icon: "Briefcase",
    description: "Work history and positions"
  },
  {
    type: "education",
    label: "Education",
    icon: "GraduationCap",
    description: "Academic background"
  },
  {
    type: "skills",
    label: "Skills",
    icon: "Star",
    description: "Technical and soft skills"
  },
  {
    type: "project",
    label: "Projects",
    icon: "Folder",
    description: "Notable projects"
  },
  {
    type: "certification",
    label: "Certifications",
    icon: "Award",
    description: "Professional certifications"
  },
  {
    type: "language",
    label: "Languages",
    icon: "Globe",
    description: "Language proficiency"
  },
  {
    type: "award",
    label: "Awards",
    icon: "Trophy",
    description: "Awards and recognition"
  },
  {
    type: "volunteer",
    label: "Volunteer",
    icon: "Heart",
    description: "Volunteer experience"
  },
  {
    type: "publication",
    label: "Publications",
    icon: "Book",
    description: "Published works"
  },
  {
    type: "custom",
    label: "Custom",
    icon: "Plus",
    description: "Custom content section"
  }
];

export const getFormTemplateByType = (type: string): FormTemplate | undefined => {
  return FORM_TEMPLATES.find(template => template.type === type);
};
