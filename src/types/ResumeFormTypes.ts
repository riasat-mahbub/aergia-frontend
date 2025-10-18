export interface ResumeFormBase {
    title: string;
    id: string;
    type: string;
    visible: boolean;
}

export type ResumeForm = 
  | ResumeProfile 
  | ResumeExperience 
  | ResumeEducation 
  | ResumeProject 
  | ResumeSkills
  | ResumeCustom;

export interface ResumeURL{
  url: string;
  title?: string;
  urlIcon?: string;
}

export interface ResumeProfile extends ResumeFormBase {
  name: string;
  nameIcon?: string;
  email: string;
  emailIcon?: string;
  phone: string;
  phoneIcon?: string;
  urls: ResumeURL[];
  summary: string;
  location: string;
  locationIcon?: string;
}

export interface ResumeExperience extends ResumeFormBase {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ResumeEducation extends ResumeFormBase {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  description: string;
}

export interface ResumeProject extends ResumeFormBase {
  project: string;
  subtitle: string;
  startDate: string;
  endDate: string;
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
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}