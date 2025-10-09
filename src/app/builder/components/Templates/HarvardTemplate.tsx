import { memo } from "react";
import CustomForm from "../ResumePreview/CustomForm";
import EducationForm from "../ResumePreview/EducationForm";
import ExperienceForm from "../ResumePreview/ExperienceForm";
import ProjectForm from "../ResumePreview/ProjectForm";
import SkillsForm from "../ResumePreview/SkillsForm";
import ProfileForm from "../ResumePreview/ProfileForm";
import { ResumeCustom, ResumeEducation, ResumeExperience, ResumeProfile, ResumeProject, ResumeSkills } from "@/types/ResumeFormTypes";
import { Template } from "./TemplateRegistry";

export type HarvardFormMap = {
  custom: ResumeCustom;
  education: ResumeEducation;
  experience: ResumeExperience;
  profile: ResumeProfile;
  project: ResumeProject;
  skills: ResumeSkills;
};

export const HarvardTemplate: Template<HarvardFormMap>= {
  custom: memo(CustomForm),
  education: memo(EducationForm),
  experience: memo(ExperienceForm),
  project: memo(ProjectForm),
  skills: memo(SkillsForm),
  profile: memo(ProfileForm),
};