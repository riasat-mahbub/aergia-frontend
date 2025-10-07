import { v4 as uuidv4 } from "uuid";
import { 
  emptyCustom, 
  emptyProfile, 
  emptyExperience, 
  emptyEducation, 
  emptyProject, 
  emptySkills 
} from "@/constants/resumeFormTemplates";
import { ResumeForm } from "@/types/ResumeFormTypes";

type FormTemplate = {
  template: ResumeForm;
  titlePrefix: string;
};

const FORM_TEMPLATES: Record<string, FormTemplate> = {
  profile: { template: emptyProfile, titlePrefix: 'Profile' },
  Experience: { template: emptyExperience, titlePrefix: 'Work Experience' },
  education: { template: emptyEducation, titlePrefix: 'Education' },
  project: { template: emptyProject, titlePrefix: 'Project' },
  skills: { template: emptySkills, titlePrefix: 'Skills' },
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
