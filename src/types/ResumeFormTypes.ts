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
  | ResumeCustom
  | ResumeCertification
  | ResumeLanguage
  | ResumeAward
  | ResumeVolunteer
  | ResumePublication;

export interface ProfileItem{
  title: string;
  order: number;
  icon: string;
  type: string;
}
export interface ResumeURL extends ProfileItem{
  url: string;
}

export interface ResumeProfile extends ResumeFormBase {
  name: string;
  infos: ProfileItem[];
  urls: ResumeURL[];
  summary: string;
}

export interface ResumeExperience extends ResumeFormBase {
  company: string;
  jobTitle: string;
  employmentType: string;
  isCurrentRole: boolean;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface ResumeEducation extends ResumeFormBase {
  school: string;
  degree: string;
  fieldOfStudy: string;
  isCurrentlyStudying: boolean;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  honors: string[];
  description: string;
}

export interface ResumeProject extends ResumeFormBase {
  project: string;
  subtitle: string;
  projectUrl: string;
  isOngoing: boolean;
  startDate: string;
  endDate: string;
  location: string;
  role: string;
  technologies: string[];
  description: string;
}

export interface ResumeSkills extends ResumeFormBase {
  category: string;
  skills: string[];
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

export interface ResumeCertification extends ResumeFormBase {
  name: string;
  issuingOrganization: string;
  credentialUrl: string;
  issueDate: string;
  expirationDate: string;
  doesNotExpire: boolean;
  credentialId: string;
}

export interface ResumeLanguage extends ResumeFormBase {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface ResumeAward extends ResumeFormBase {
  title: string;
  issuer: string;
  dateReceived: string;
  description: string;
  url: string;
}

export interface ResumeVolunteer extends ResumeFormBase {
  organization: string;
  role: string;
  isCurrentRole: boolean;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  cause: string;
}

export interface ResumePublication extends ResumeFormBase {
  title: string;
  publisher: string;
  publicationDate: string;
  publicationUrl: string;
  description: string;
  authors: string[];
}