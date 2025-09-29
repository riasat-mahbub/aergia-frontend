import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeExperience } from "./ResumeFormTypes";

export interface FormHolder{
    id: string;
    title: string;
    icon: string;
    type: string;
    data: ResumeForm[];
    style: object;
    visible: boolean;
    order: number;
}

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