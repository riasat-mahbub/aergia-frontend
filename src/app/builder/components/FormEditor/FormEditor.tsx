'use client'
import { ResumeCustom, ResumeEducation, ResumeForm, ResumeProfile, ResumeProject, ResumeSkills, ResumeExperience } from "@/types/ResumeFormTypes";
import { useDispatch, useSelector } from "react-redux";
import { getFormHolderById, setSelectedForm, updateForm } from "@/store/formSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { RootState } from "@/store/store";
import ProfileFormEditor from "./ProfileFormEditor";
import ExperienceFormEditor from "./ExperienceFormEditor";
import EducationFormEditor from "./EducationFormEditor";
import ProjectFormEditor from "./ProjectFormEditor";
import SkillsFormEditor from "./SkillsFormEditor";
import CustomFormEditor from "./CustomFormEditor";
import { useState } from "react";

interface FormEditorProps {
  form: ResumeForm;
  formHolderId: string;
}

export default function FormEditor({ form, formHolderId }: FormEditorProps) {
  const dispatch = useDispatch();
  const cvId = useSelector((state: RootState) => state.forms.cvId);
  const { updateFormHolderData } = useFormHolders(cvId);
  let formHolder = useSelector((state: RootState) => 
    getFormHolderById(state, formHolderId)
  );

  const [formData, setFormData] = useState(form);
  
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    if (!formHolder || !cvId) return;

    await updateFormHolderData(formHolder, formData);

    dispatch(updateForm({
      formHolderId,
      form: formData,
    }));

    dispatch(setSelectedForm(null));
  };

  const onBack = () => {
    dispatch(setSelectedForm(null));
  }

  return (
    <div className="w-11/12 my-6">
      <div>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-bold"
        />
      </div>
      {(() => {
        switch (form.type) {
          case 'profile':
            return <ProfileFormEditor formData={formData as ResumeProfile} onSave={handleSave} onCancel={onBack} handleChange={handleChange}/>;
            
          case 'Experience':
            return <ExperienceFormEditor formData={formData as ResumeExperience} onSave={handleSave} onCancel={onBack}  handleChange={handleChange}/>;
            
          case 'education':
            return <EducationFormEditor formData={formData as ResumeEducation} onSave={handleSave} onCancel={onBack}  handleChange={handleChange}/>;
            
          case 'project':
            return <ProjectFormEditor formData={formData as ResumeProject} onSave={handleSave} onCancel={onBack}  handleChange={handleChange}/>;
            
          case 'skills':
            return <SkillsFormEditor formData={formData as ResumeSkills} onSave={handleSave} onCancel={onBack}  handleChange={handleChange}/>;
            
          case 'custom':
            return <CustomFormEditor formData={formData as ResumeCustom} onSave={handleSave} onCancel={onBack}  handleChange={handleChange}/>;
            
          default:
            return (
              <div className="p-4 border rounded mb-4">
                <h2 className="font-bold text-lg">Unknown Form Type</h2>
                <p>Title: {formData.title}</p>
              </div>
            );
        }
      })()}
    </div>
  );
}