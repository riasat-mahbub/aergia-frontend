import { ComponentType } from 'react';
import { ResumeForm } from '@/types/ResumeFormTypes';
import ProfileFormEditor from './ProfileFormEditor';
import ExperienceFormEditor from './ExperienceFormEditor';
import EducationFormEditor from './EducationFormEditor';
import SkillsFormEditor from './SkillsFormEditor';
import ProjectFormEditor from './ProjectFormEditor';
import CustomFormEditor from './CustomFormEditor';
import CertificationFormEditor from './CertificationFormEditor';
import LanguageFormEditor from './LanguageFormEditor';
import AwardFormEditor from './AwardFormEditor';
import VolunteerFormEditor from './VolunteerFormEditor';
import PublicationFormEditor from './PublicationFormEditor';

export interface FormEditorProps<T extends ResumeForm> {
  form: T;
  formHolderId: string;
  onChange: (form: T) => void;
}

type FormEditorComponent<T extends ResumeForm> = ComponentType<FormEditorProps<T>>;

interface FormEditorRegistryType {
  profile: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeProfile>;
  experience: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeExperience>;
  education: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeEducation>;
  skills: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeSkills>;
  project: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeProject>;
  custom: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeCustom>;
  certification: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeCertification>;
  language: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeLanguage>;
  award: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeAward>;
  volunteer: FormEditorComponent<import('@/types/ResumeFormTypes').ResumeVolunteer>;
  publication: FormEditorComponent<import('@/types/ResumeFormTypes').ResumePublication>;
}

export const FormEditorRegistry: FormEditorRegistryType = {
  profile: ProfileFormEditor,
  experience: ExperienceFormEditor,
  education: EducationFormEditor,
  skills: SkillsFormEditor,
  project: ProjectFormEditor,
  custom: CustomFormEditor,
  certification: CertificationFormEditor,
  language: LanguageFormEditor,
  award: AwardFormEditor,
  volunteer: VolunteerFormEditor,
  publication: PublicationFormEditor,
};

export function getFormEditor<T extends ResumeForm>(type: string): FormEditorComponent<T> | null {
  return (FormEditorRegistry as Record<string, FormEditorComponent<T>>)[type] || null;
}
