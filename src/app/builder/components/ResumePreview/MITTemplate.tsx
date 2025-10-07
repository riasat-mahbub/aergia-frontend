import { ComponentType, memo } from "react";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import { ResumeCustom, ResumeEducation, ResumeExperience, ResumeProfile, ResumeProject, ResumeSkills } from "@/types/ResumeFormTypes";
import { Template } from "./TemplateRegistry";

type MITFormMap = {
  custom: ResumeCustom;
  education: ResumeEducation;
  experience: ResumeExperience;
  profile: ResumeProfile;
  project: ResumeProject;
  skills: ResumeSkills;
};

export const MITTemplate: Template<MITFormMap>= {
  custom: memo(CustomForm),
  education: memo(EducationForm),
  experience: memo(ExperienceForm),
  project: memo(ProjectForm),
  skills: memo(SkillsForm),
  profile: memo(ProfileForm),
};