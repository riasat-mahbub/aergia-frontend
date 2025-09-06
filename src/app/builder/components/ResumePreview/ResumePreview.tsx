import { FormHolder, CustomFormHolder, EducationFormHolder, ExperienceFormHolder, ProjectFormHolder, SkillsFormHolder, ProfileFormHolder } from "@/types/FormHolderTypes";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import "@/styles/resume-styles.css";
import { ResumeCustom, ResumeEducation, ResumeExperience, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills } from "@/types/ResumeFormTypes";

export default function ResumePreview({ form }: { form: ResumeForm }) {

   return (
       <>
       {(() =>{
            switch (form.type) {
                case 'custom':
                    return <CustomForm key={form.id} form={form as ResumeCustom} />;
                case 'education':
                    return <EducationForm key={form.id} form={form as ResumeEducation} />;
                case 'Experience':
                    return <ExperienceForm key={form.id} form={form as ResumeExperience} />;
                case 'project':
                    return <ProjectForm key={form.id} form={form as ResumeProject} />;
                case 'skills':
                    return <SkillsForm key={form.id} form={form as ResumeSkills} />;
                case 'profile':
                    return <ProfileForm key={form.id} form={form as ResumeProfile} />;
                default:
                    return null;
            }
       })()}
       </>
   );
}
