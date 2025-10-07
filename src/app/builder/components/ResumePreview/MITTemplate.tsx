import { ComponentType, memo } from "react";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import { FormKey, FormTypeMap } from "@/types/ResumeFormTypes";
import { BaseFormProps } from "./ResumePreview";

export const MITTemplate: { [K in FormKey]: ComponentType<BaseFormProps<FormTypeMap[K]>> } = {
  custom: memo(CustomForm),
  education: memo(EducationForm),
  experience: memo(ExperienceForm),
  project: memo(ProjectForm),
  skills: memo(SkillsForm),
  profile: memo(ProfileForm),
};