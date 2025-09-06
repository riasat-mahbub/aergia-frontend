import { ProjectFormHolder } from "@/types/FormHolderTypes";
import { ResumeProject } from "@/types/ResumeFormTypes";

export default function ProjectForm({projectFormHolder}: { projectFormHolder: ProjectFormHolder }) {
  return (
    <div className="flex flex-col projectHolder">
      <div className="projectHolderTitle">{projectFormHolder.title}</div>
      {projectFormHolder.data.map((form: ResumeProject, index) => {
        if(form.visible){
          return (
            <div key={form.id} className="projectForm">
              <div className="projectFormProject">{form.project}</div>
              <div className="projectFormDate">{form.date}</div>
              <div className="projectFormSubtitle">{form.subtitle}</div>
              <div className="projectFormDescription">{form.description}</div>
            </div>
          );
      }
      })}
    </div>
  );
}