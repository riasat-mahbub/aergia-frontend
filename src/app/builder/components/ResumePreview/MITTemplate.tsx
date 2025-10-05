import { ComponentType } from "react";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";

export const MITTemplate: Record<string, ComponentType<any>> = {
    custom: CustomForm ,
    education: EducationForm,
    Experience: ExperienceForm,
    project : ProjectForm,
    skills: SkillsForm,
    profile: ProfileForm,
}