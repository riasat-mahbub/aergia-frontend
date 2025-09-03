"use client";

import { ProjectFormHolder } from "@/types/FormHolderTypes";
import { ResumeProject } from "@/types/ResumeFormTypes";

export default function ProjectForm({projectFormHolder}: { projectFormHolder: ProjectFormHolder }) {

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="flex flex-col projectHolder">
      <div className="projectHolderTitle">{projectFormHolder.title}</div>
      {projectFormHolder.data.map((form: ResumeProject, index) => {
        return (
          <div key={form.id} className="projectForm">
            <div className="projectFormProject">{form.project}</div>
            <div className="projectFormDate">{form.date}</div>
            {form.descriptions.map((desc, descIndex) => (
              <div key={descIndex} className="projectFormDescription">{desc}</div>
            ))}
          </div>
        );
      })}
    </div>
  );
}