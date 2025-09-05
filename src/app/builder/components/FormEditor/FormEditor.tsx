'use client'
import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeWorkExperience } from "@/types/ResumeFormTypes";
import { useDispatch } from "react-redux";
import { setSelectedForm, updateForm } from "@/store/formSlice";
import ProfileFormEditor from "./ProfileFormEditor";
import WorkExperienceFormEditor from "./WorkExperienceFormEditor";
import EducationFormEditor from "./EducationFormEditor";
import ProjectFormEditor from "./ProjectFormEditor";
import SkillsFormEditor from "./SkillsFormEditor";
import CustomFormEditor from "./CustomFormEditor";

interface FormEditorProps {
  form: ResumeForm;
  formHolderId: string;
}

export default function FormEditor({ form, formHolderId }: FormEditorProps) {
  const dispatch = useDispatch();
  
  const handleSave = (updatedForm: ResumeForm) => {
    dispatch(updateForm({
      formHolderId: formHolderId,
      form: updatedForm
    }));
    dispatch(setSelectedForm(null));
  };

  const onBack = () => {
    dispatch(setSelectedForm(null));
  }

  return (
    <div className="w-11/12 my-6">
      {(() => {
        switch (form.type) {
          case 'profile':
            return <ProfileFormEditor form={form as ResumeProfile} onSave={handleSave} onCancel={onBack} />;
            
          case 'workExperience':
            return <WorkExperienceFormEditor form={form as ResumeWorkExperience} onSave={handleSave} onCancel={onBack} />;
            
          case 'education':
            return <EducationFormEditor form={form as ResumeEducation} onSave={handleSave} onCancel={onBack} />;
            
          case 'project':
            return <ProjectFormEditor form={form as ResumeProject} onSave={handleSave} onCancel={onBack} />;
            
          case 'skills':
            return <SkillsFormEditor form={form as ResumeSkills} onSave={handleSave} onCancel={onBack} />;
            
          case 'custom':
            return <CustomFormEditor form={form as ResumeCustom} onSave={handleSave} onCancel={onBack} />;
            
          default:
            return (
              <div className="p-4 border rounded mb-4">
                <h2 className="font-bold text-lg">Unknown Form Type</h2>
                <p>Title: {form.title}</p>
              </div>
            );
        }
      })()}
    </div>
  );
}