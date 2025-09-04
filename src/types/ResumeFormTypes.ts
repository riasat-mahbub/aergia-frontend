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
  type: string;
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience extends ResumeFormBase {
  type: string;
  company: string;
  jobTitle: string;
  date: string;
  description: string;
}

export interface ResumeEducation extends ResumeFormBase {
  type: string;
  school: string;
  degree: string;
  date: string;
  gpa: string;
  description: string;
}

export interface ResumeProject extends ResumeFormBase {
  type: string;
  project: string;
  date: string;
  description: string;
}

export interface FeaturedSkill extends ResumeFormBase {
  type: string;
  skill: string;
  rating: number;
}

export interface ResumeSkills extends ResumeFormBase {
  type: string;
  featuredSkills: FeaturedSkill[];
  description: string;
}

export interface ResumeCustom extends ResumeFormBase {
  type: string;
  description: string;
}