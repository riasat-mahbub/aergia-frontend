import { FormHolder, CustomFormHolder, EducationFormHolder, ExperienceFormHolder, ProjectFormHolder, SkillsFormHolder, ProfileFormHolder } from "@/types/FormHolderTypes";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import "@/styles/resume-styles.css";

export default function ResumePreview({ formHolder }: { formHolder: FormHolder }) {

   return (
       <>
       {(() =>{
            switch (formHolder.type) {
                case 'custom':
                    return <CustomForm key={formHolder.id} customFormHolder={formHolder as CustomFormHolder} />;
                case 'education':
                    return <EducationForm key={formHolder.id} eduFormHolder={formHolder as EducationFormHolder} />;
                case 'Experience':
                    return <ExperienceForm key={formHolder.id} ExperienceFormHolder={formHolder as ExperienceFormHolder} />;
                case 'project':
                    return <ProjectForm key={formHolder.id} projectFormHolder={formHolder as ProjectFormHolder} />;
                case 'skills':
                    return <SkillsForm key={formHolder.id} skillsFormHolder={formHolder as SkillsFormHolder} />;
                case 'profile':
                    return <ProfileForm key={formHolder.id} profileFormHolder={formHolder as ProfileFormHolder} />;
                default:
                    return null;
            }
       })()}
       </>
   );
}
