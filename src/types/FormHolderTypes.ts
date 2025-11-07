import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeExperience } from "./ResumeFormTypes";
import { ResumeStructure } from "./ResumeStructureTypes";

interface FormHolderBase{
    title: string;
    type: string;
    visible: boolean;
    order: number;
}

export interface FormHolder extends FormHolderBase{
    id: string;
    icon: string;
    data: ResumeForm[];
    style?: Record<string, Record<string, string | number>>;
    structure?: ResumeStructure;
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