import { v4 as uuidv4 } from "uuid";
import { 
  emptyCustom, 
  emptyProfile, 
  emptyExperience, 
  emptyEducation, 
  emptyProject, 
  emptySkills,
  emptyCertification,
  emptyLanguage,
  emptyAward,
  emptyVolunteer,
  emptyPublication
} from "@/constants/resumeFormTemplates";
import { ResumeForm } from "@/types/ResumeFormTypes";

type FormTemplate = {
  template: ResumeForm;
  titlePrefix: string;
};

const FORM_TEMPLATES: Record<string, FormTemplate> = {
  profile: { template: emptyProfile, titlePrefix: 'Profile' },
  experience: { template: emptyExperience, titlePrefix: 'Work Experience' },
  education: { template: emptyEducation, titlePrefix: 'Education' },
  project: { template: emptyProject, titlePrefix: 'Project' },
  skills: { template: emptySkills, titlePrefix: 'Skills' },
  certification: { template: emptyCertification, titlePrefix: 'Certification' },
  language: { template: emptyLanguage, titlePrefix: 'Language' },
  award: { template: emptyAward, titlePrefix: 'Award' },
  volunteer: { template: emptyVolunteer, titlePrefix: 'Volunteer Work' },
  publication: { template: emptyPublication, titlePrefix: 'Publication' },
};

export function createFormByType(type: string, count: number) {
  const id = uuidv4();
  const formConfig = FORM_TEMPLATES[type] || { template: emptyCustom, titlePrefix: 'Custom Section' };
  
  return { 
    ...formConfig.template, 
    id, 
    title: `${formConfig.titlePrefix} ${count}` 
  };
}