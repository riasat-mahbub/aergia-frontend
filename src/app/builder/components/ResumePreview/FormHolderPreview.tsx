"use client"

import { FormHolder } from "@/types/FormHolderTypes"
import CustomForm from "./CustomForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProfileForm from "./ProfileForm";
import ProjectForm from "./ProjectForm";
import { ResumeCustom, ResumeEducation, ResumeExperience } from "@/types/ResumeFormTypes";
import ResumePreview from "./ResumePreview";

interface FormHolderPreviewProps{
    formHolder: FormHolder
}

export default function FormHolderPreview({formHolder}: FormHolderPreviewProps){

   return (
       <>
       {(() =>{
            switch (formHolder.type) {
                case 'custom':
                case 'education':
                case 'Experience':
                case 'project':
                case 'skills':
                    return(
                        <div className="flex flex-col FormHolder">
                            <div className="FormHolderTitle">{formHolder.title}</div>
                            {formHolder.data.map((form, index) => {
                                return <ResumePreview key={formHolder.id} form={form as ResumeExperience} />;
                            })}
                        </div>
                    )
                case 'profile':
                    return(
                        <>
                        <div className="flex flex-col FormHolder"></div>
                            {formHolder.data.map((form, index) => {
                                if(form.visible){
                                    return <ResumePreview key={formHolder.id} form={form as ResumeExperience} />;
                                }
                            })}
                        </>
                    )
                default:
                    return null;
            }
       })()}
       </>
   );
}