import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeExperience } from "./ResumeFormTypes";

interface FormHolderBase{
    title: string;
    type: string;
    visible: boolean;
    order: number;
}

export type FormHolderStructure = {
  type: string;
  style?: string;
  bind?: string;
  text?: string;
  if?: string | boolean;
  children?: Array<FormHolderStructure | string>;
  [key: string]: any;
};


export interface FormHolder extends FormHolderBase{
    id: string;
    icon: string;
    data: ResumeForm[];
    style: Record<string, Record<string, string>>;
    structure: FormHolderStructure;
}

// separate type for API to handel stringified JSON
export interface ApiFormHolder extends FormHolderBase{
    data: string;
    style: string;
}

export type FormTypeMap = {
    'custom': ResumeCustom;
    'education': ResumeEducation;
    'experience': ResumeExperience;
    'project': ResumeProject;
    'skills': ResumeSkills;
    'profile': ResumeProfile;
};

export interface CustomFormHolder extends FormHolder {
    data: ResumeCustom[];
}

export interface EducationFormHolder extends FormHolder {
    data: ResumeEducation[];
}

export interface ExperienceFormHolder extends FormHolder {
    data: ResumeExperience[];
}

export interface ProjectFormHolder extends FormHolder {
    data: ResumeProject[];
}

export interface SkillsFormHolder extends FormHolder {
    data: ResumeSkills[];
}
export interface ProfileFormHolder extends FormHolder {
    data: ResumeProfile[];
}