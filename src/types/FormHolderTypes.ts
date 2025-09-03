import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeWorkExperience } from "./ResumeFormTypes";

export interface FormHolder{
    id: string;
    title: string;
    icon: string;
    type: string;
    data: ResumeForm[];
    visible: boolean;
}

export interface CustomFormHolder extends FormHolder {
    data: ResumeCustom[];
}

export interface EducationFormHolder extends FormHolder {
    data: ResumeEducation[];
}

export interface WorkExperienceFormHolder extends FormHolder {
    data: ResumeWorkExperience[];
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