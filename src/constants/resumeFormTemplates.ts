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
  type: "profile",
  name: "",
  email: "",
  phone: "",
  url: "",
  summary: "",
  location: "",
  visible: true
};

export const emptyWorkExperience: ResumeWorkExperience = {
  title: "Work Experience",
  id: uuidv4(),
  type: "workExperience",
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
  visible: true

};

export const emptyEducation: ResumeEducation = {
  title: "Education",
  id: uuidv4(),
  type: "education",
  school: "",
  degree: "",
  date: "",
  gpa: "",
  descriptions: [],
  visible: true

};

export const emptyProject: ResumeProject = {
  title: "Project",
  id: uuidv4(),
  type: "project",
  project: "",
  date: "",
  descriptions: [],
  visible: true

};

export const emptyFeaturedSkill: FeaturedSkill = {
  title: "Skill",
  id: uuidv4(),
  type: "featuredSkill",
  skill: "",
  rating: 0,
  visible: true
};

export const emptySkills: ResumeSkills = {
  title: "Skills",
  id: uuidv4(),
  type: "skills",
  featuredSkills: [],
  descriptions: [],
  visible: true

};

export const emptyCustom: ResumeCustom = {
  title: "Custom Section",
  id: uuidv4(),
  type: "custom",
  description: "",
  visible: true

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