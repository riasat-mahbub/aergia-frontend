'use client'
import { 
  ResumeForm,
  ResumeProfile,
  ResumeWorkExperience,
  ResumeEducation,
  ResumeProject,
  ResumeSkills,
  ResumeCustom,
  FeaturedSkill,
} from "@/types/ResumeFormTypes";
import RichTextEditor from "@/components/RichTextEditor";
import { useDispatch } from "react-redux";
import { updateForm } from "@/store/formSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormMapperProps {
  form: ResumeForm;
  formHolderId: string;
}

// Form mapper component
export default function FormMapper({ form, formHolderId }: FormMapperProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  // Use a temporary form for all changes
  const [tempForm, setTempForm] = useState<ResumeForm>(form);
  
  const handleSave = () => {
    // Update the form with the temporary form contents
    dispatch(updateForm({
      formHolderId: formHolderId,
      form: tempForm
    }));
    router.back();
  };
  
  const handleCancel = () => {
    router.back();
  };
  // Common buttons for all form types
  const renderButtons = () => (
    <div className="mt-6 flex justify-end space-x-3">
      <button 
        onClick={handleCancel}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button 
        onClick={handleSave}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );

  switch (tempForm.type) {
    case 'profile':
      const profileForm = tempForm as ResumeProfile;
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Profile</h2>
          <p>Name: {profileForm.name || 'Not specified'}</p>
          <p>Email: {profileForm.email || 'Not specified'}</p>
          <p>Phone: {profileForm.phone || 'Not specified'}</p>
          {renderButtons()}
        </div>
      );
      
    case 'workExperience':
      const workForm = tempForm as ResumeWorkExperience;
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Work Experience</h2>
          <p>Company: {workForm.company || 'Not specified'}</p>
          <p>Job Title: {workForm.jobTitle || 'Not specified'}</p>
          <p>Date: {workForm.date || 'Not specified'}</p>
          {renderButtons()}
        </div>
      );
      
    case 'education':
      const educationForm = tempForm as ResumeEducation;
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Education</h2>
          <p>School: {educationForm.school || 'Not specified'}</p>
          <p>Degree: {educationForm.degree || 'Not specified'}</p>
          <p>GPA: {educationForm.gpa || 'Not specified'}</p>
          {renderButtons()}
        </div>
      );
      
    case 'project':
      const projectForm = tempForm as ResumeProject;
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Project</h2>
          <p>Project Name: {projectForm.project || 'Not specified'}</p>
          <p>Date: {projectForm.date || 'Not specified'}</p>
          {renderButtons()}
        </div>
      );
      
    case 'skills':
      const skillsForm = tempForm as ResumeSkills;
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Skills</h2>
          <p>Featured Skills: {skillsForm.featuredSkills.length || 0}</p>
          <ul className="list-disc pl-5">
            {skillsForm.featuredSkills.map((skill, index) => (
              <li key={index}>{skill.skill} - Rating: {skill.rating}/5</li>
            ))}
          </ul>
          {renderButtons()}
        </div>
      );
      
      
    case 'custom':
      const customForm = tempForm as ResumeCustom;
      
      function handleDescriptionChange (html: string){
        setTempForm({
          ...customForm,
          description: html
        });
      };

      function handleTitleChange(title:string){
        setTempForm({
          ...customForm,
          title: title
        });
      }
      
      return (
        <div className="p-4 border rounded mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={customForm.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <RichTextEditor 
              content={customForm.description || ''} 
              onChange={handleDescriptionChange} 
            />
          </div>
          {renderButtons()}
        </div>
      );
      
    default:
      return (
        <div className="p-4 border rounded mb-4">
          <h2 className="font-bold text-lg">Unknown Form Type</h2>
          <p>Title: {tempForm.title}</p>
          <p>ID: {tempForm.id}</p>
          {renderButtons()}
        </div>
      );
  }
}