import { 
  ResumeCustom, 
  ResumeEducation, 
  ResumeForm, 
  ResumeProfile, 
  ResumeProject, 
  ResumeSkills, 
  ResumeExperience,
  ResumeCertification,
  ResumeLanguage,
  ResumeAward,
  ResumeVolunteer,
  ResumePublication
} from "./ResumeFormTypes";
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
    'certification': ResumeCertification;
    'language': ResumeLanguage;
    'award': ResumeAward;
    'volunteer': ResumeVolunteer;
    'publication': ResumePublication;
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

export interface CertificationFormHolder extends FormHolder {
    data: ResumeCertification[];
}

export interface LanguageFormHolder extends FormHolder {
    data: ResumeLanguage[];
}

export interface AwardFormHolder extends FormHolder {
    data: ResumeAward[];
}

export interface VolunteerFormHolder extends FormHolder {
    data: ResumeVolunteer[];
}

export interface PublicationFormHolder extends FormHolder {
    data: ResumePublication[];
}