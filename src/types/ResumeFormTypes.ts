export interface ResumeFormBase {
    title: string;
    id: string;
    type: string;
    visible: boolean;
}

export type ResumeForm = 
  | ResumeProfile 
  | ResumeWorkExperience 
  | ResumeEducation 
  | ResumeProject 
  | ResumeSkills
  | ResumeCustom;

export interface ResumeProfile extends ResumeFormBase {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience extends ResumeFormBase {
  company: string;
  jobTitle: string;
  date: string;
  location: string;
  description: string;
}

export interface ResumeEducation extends ResumeFormBase {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  location: string;
  description: string;
}

export interface ResumeProject extends ResumeFormBase {
  project: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface ResumeSkills extends ResumeFormBase {
  skill: string;
  rating: number;
  description: string;
}

export interface ResumeCustom extends ResumeFormBase {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
}