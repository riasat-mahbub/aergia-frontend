import { View } from "@react-pdf/renderer";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import { ResumeCustom, ResumeEducation, ResumeExperience, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills } from "@/types/ResumeFormTypes";

export default function ResumePreview({ form }: { form: ResumeForm }) {
   switch (form.type) {
       case 'custom':
           return <CustomForm form={form as ResumeCustom} />;
       case 'education':
           return <EducationForm form={form as ResumeEducation} />;
       case 'Experience':
           return <ExperienceForm form={form as ResumeExperience} />;
       case 'project':
           return <ProjectForm form={form as ResumeProject} />;
       case 'skills':
           return <SkillsForm form={form as ResumeSkills} />;
       case 'profile':
           return <ProfileForm form={form as ResumeProfile} />;
       default:
           return <View />;
   }
}
