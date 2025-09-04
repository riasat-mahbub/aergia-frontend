import { FormHolder, CustomFormHolder, EducationFormHolder, WorkExperienceFormHolder, ProjectFormHolder, SkillsFormHolder, ProfileFormHolder } from "@/types/FormHolderTypes";
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import "@/styles/resume-styles.css";

export default function ResumePreview({ formHolders }: { formHolders: FormHolder[] }) {

    const renderFormComponent = (holder: FormHolder) => {
        switch (holder.type) {
            case 'custom':
                return <CustomForm key={holder.id} customFormHolder={holder as CustomFormHolder} />;
            case 'education':
                return <EducationForm key={holder.id} eduFormHolder={holder as EducationFormHolder} />;
            case 'workExperience':
                return <WorkExperienceForm key={holder.id} workExperienceFormHolder={holder as WorkExperienceFormHolder} />;
            case 'project':
                return <ProjectForm key={holder.id} projectFormHolder={holder as ProjectFormHolder} />;
            case 'skills':
                return <SkillsForm key={holder.id} skillsFormHolder={holder as SkillsFormHolder} />;
            case 'profile':
                return <ProfileForm key={holder.id} profileFormHolder={holder as ProfileFormHolder} />;
            default:
                return null;
        }
    };

   return (
       <div className="bg-white w-[794] h-[1123] p-6 rounded-lg shadow-lg">
           {formHolders.map(renderFormComponent)}
       </div>
   );
}
