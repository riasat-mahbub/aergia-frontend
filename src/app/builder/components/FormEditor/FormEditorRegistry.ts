import ProfileFormEditor from "./ProfileFormEditor";
import ExperienceFormEditor from "./ExperienceFormEditor";
import EducationFormEditor from "./EducationFormEditor";
import ProjectFormEditor from "./ProjectFormEditor";
import SkillsFormEditor from "./SkillsFormEditor";
import CustomFormEditor from "./CustomFormEditor";

export const FORM_COMPONENTS = {
  profile: ProfileFormEditor,
  experience: ExperienceFormEditor,
  education: EducationFormEditor,
  project: ProjectFormEditor,
  skills: SkillsFormEditor,
  custom: CustomFormEditor,
} as const;