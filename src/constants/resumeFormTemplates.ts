import { 
  ResumeFormBase,
  ResumeProfile,
  ResumeWorkExperience,
  ResumeEducation,
  ResumeProject,
  FeaturedSkill,
  ResumeSkills,
  ResumeCustom
} from '@/types/ResumeFormTypes';
import { v4 as uuidv4 } from 'uuid';

export const emptyProfile: ResumeProfile = {
  title: "Profile",
  id: uuidv4(),
  name: "",
  email: "",
  phone: "",
  url: "",
  summary: "",
  location: ""
};

export const emptyWorkExperience: ResumeWorkExperience = {
  title: "Work Experience",
  id: uuidv4(),
  company: "",
  jobTitle: "",
  date: "",
  descriptions: []
};

export const emptyEducation: ResumeEducation = {
  title: "Education",
  id: uuidv4(),
  school: "",
  degree: "",
  date: "",
  gpa: "",
  descriptions: []
};

export const emptyProject: ResumeProject = {
  title: "Project",
  id: uuidv4(),
  project: "",
  date: "",
  descriptions: []
};

export const emptyFeaturedSkill: FeaturedSkill = {
  title: "Skill",
  id: uuidv4(),
  skill: "",
  rating: 0
};

export const emptySkills: ResumeSkills = {
  title: "Skills",
  id: uuidv4(),
  featuredSkills: [],
  descriptions: []
};

export const emptyCustom: ResumeCustom = {
  title: "Custom Section",
  id: uuidv4(),
  description: ""
};

// Collection of all form templates
export const formTemplates = {
  profile: emptyProfile,
  workExperience: emptyWorkExperience,
  education: emptyEducation,
  project: emptyProject,
  featuredSkill: emptyFeaturedSkill,
  skills: emptySkills,
  custom: emptyCustom
};

// Helper function to create a new form with a unique ID
export const createForm = <T extends ResumeFormBase>(
  template: T, 
  overrides: Partial<T> = {}
): T => {
  return {
    ...template,
    id: uuidv4(),
    ...overrides
  };
};