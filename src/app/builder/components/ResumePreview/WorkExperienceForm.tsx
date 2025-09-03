"use client";

import { WorkExperienceFormHolder } from "@/types/FormHolderTypes";
import { ResumeWorkExperience } from "@/types/ResumeFormTypes";

export default function WorkExperienceForm({workExperienceFormHolder}: { workExperienceFormHolder: WorkExperienceFormHolder }) {

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="flex flex-col workExperienceHolder">
      <div className="workExperienceHolderTitle">{workExperienceFormHolder.title}</div>
      {workExperienceFormHolder.data.map((form: ResumeWorkExperience, index) => {
        return (
          <div key={form.id} className="workExperienceForm">
            <div className="workExperienceFormCompany">{form.company}</div>
            <div className="workExperienceFormJobTitle">{form.jobTitle}</div>
            <div className="workExperienceFormDate">{form.date}</div>
            {form.descriptions.map((desc, descIndex) => (
              <div key={descIndex} className="workExperienceFormDescription">{desc}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}