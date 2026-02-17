import { 
  ResumeFormBase,
  ResumeProfile,
  ResumeExperience,
  ResumeEducation,
  ResumeProject,
  ResumeCustom,
  ResumeSkills,
  ResumeCertification,
  ResumeLanguage,
  ResumeAward,
  ResumeVolunteer,
  ResumePublication
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
  employmentType: "",
  isCurrentRole: false,
  startDate: "",
  endDate: "",
  location: "",
  description: "",
  technologies: [],
  achievements: [],
  visible: true
};

export const emptyEducation: ResumeEducation = {
  title: "Education",
  id: uuidv4(),
  type: "education",
  school: "",
  degree: "",
  fieldOfStudy: "",
  isCurrentlyStudying: false,
  startDate: "",
  endDate: "",
  gpa: "",
  location: "",
  honors: [],
  description: "",
  visible: true
};

export const emptyProject: ResumeProject = {
  title: "Project",
  subtitle: "",
  id: uuidv4(),
  type: "project",
  project: "",
  projectUrl: "",
  isOngoing: false,
  startDate: "",
  endDate: "",
  location: "",
  role: "",
  technologies: [],
  description: "",
  visible: true
};

export const emptySkills: ResumeSkills = {
  title: "Skills",
  id: uuidv4(),
  type: "skills",
  category: "",
  skills: [],
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

export const emptyCertification: ResumeCertification = {
  title: "Certification",
  id: uuidv4(),
  type: "certification",
  name: "",
  issuingOrganization: "",
  credentialUrl: "",
  issueDate: "",
  expirationDate: "",
  doesNotExpire: false,
  credentialId: "",
  visible: true
};

export const emptyLanguage: ResumeLanguage = {
  title: "Language",
  id: uuidv4(),
  type: "language",
  language: "",
  proficiency: "Basic",
  visible: true
};

export const emptyAward: ResumeAward = {
  title: "Award",
  id: uuidv4(),
  type: "award",
  issuer: "",
  dateReceived: "",
  description: "",
  url: "",
  visible: true
};

export const emptyVolunteer: ResumeVolunteer = {
  title: "Volunteer Work",
  id: uuidv4(),
  type: "volunteer",
  organization: "",
  role: "",
  isCurrentRole: false,
  startDate: "",
  endDate: "",
  location: "",
  description: "",
  cause: "",
  visible: true
};

export const emptyPublication: ResumePublication = {
  title: "Publication",
  id: uuidv4(),
  type: "publication",
  publisher: "",
  publicationDate: "",
  publicationUrl: "",
  description: "",
  authors: [],
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