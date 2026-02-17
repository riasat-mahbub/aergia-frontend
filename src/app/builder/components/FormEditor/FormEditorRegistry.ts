import ProfileFormEditor from "./ProfileFormEditor";
import ExperienceFormEditor from "./ExperienceFormEditor";
import EducationFormEditor from "./EducationFormEditor";
import ProjectFormEditor from "./ProjectFormEditor";
import SkillsFormEditor from "./SkillsFormEditor";
import CustomFormEditor from "./CustomFormEditor";
import CertificationFormEditor from "./CertificationFormEditor";
import LanguageFormEditor from "./LanguageFormEditor";
import AwardFormEditor from "./AwardFormEditor";
import VolunteerFormEditor from "./VolunteerFormEditor";
import PublicationFormEditor from "./PublicationFormEditor";

export const FORM_COMPONENTS = {
  profile: ProfileFormEditor,
  experience: ExperienceFormEditor,
  education: EducationFormEditor,
  project: ProjectFormEditor,
  skills: SkillsFormEditor,
  custom: CustomFormEditor,
  certification: CertificationFormEditor,
  language: LanguageFormEditor,
  award: AwardFormEditor,
  volunteer: VolunteerFormEditor,
  publication: PublicationFormEditor,
} as const;