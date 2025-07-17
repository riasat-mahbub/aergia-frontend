export interface ResumeFormBase{
    title: string;
    id:string;
}
export interface ResumeProfile extends ResumeFormBase{
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience extends ResumeFormBase{
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation extends ResumeFormBase{
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject extends ResumeFormBase{
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill extends ResumeFormBase{
  skill: string;
  rating: number;
}

export interface ResumeSkills extends ResumeFormBase{
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom extends ResumeFormBase{
  descriptions: string[];
}