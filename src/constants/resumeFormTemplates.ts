import { 
  ResumeFormBase,
  ResumeProfile,
  ResumeExperience,
  ResumeEducation,
  ResumeProject,
  ResumeCustom,
  ResumeSkills
} from '@/types/ResumeFormTypes';
import { v4 as uuidv4 } from 'uuid';

export const emptyProfile: ResumeProfile = {
  title: "Profile",
  id: uuidv4(),
  type: "profile",
  name: "",
  infos: [],
  urls: [{title:"", order: 0, icon:"", type: "url", url:""}],
  summary: "",
  visible: true
};

export const emptyExperience: ResumeExperience = {
  title: "Work Experience",
  id: uuidv4(),
  type: "experience",
  company: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  description: "",
  location: "",
  visible: true
};

export const emptyEducation: ResumeEducation = {
  title: "Education",
  id: uuidv4(),
  type: "education",
  school: "",
  degree: "",
  startDate: "",
  endDate: "",
  gpa: "",
  location: "",
  description: "",
  visible: true

};

export const emptyProject: ResumeProject = {
  title: "Project",
  subtitle: "",
  id: uuidv4(),
  type: "project",
  project: "",
  startDate: "",
  endDate: "",
  description: "",
  visible: true

};

export const emptySkills: ResumeSkills = {
  title: "Skill",
  id: uuidv4(),
  type: "skills",
  skill: "",
  rating: 0,
  description: "",
  visible: true
};


export const emptyCustom: ResumeCustom = {
  title: "Custom",
  subtitle: "",
  location: "",
  startDate: "",
  endDate: "",
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