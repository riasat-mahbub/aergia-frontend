import SafeHTML from "@/components/SafeHTML";
import { ProjectFormHolder } from "@/types/FormHolderTypes";
import { ResumeProject } from "@/types/ResumeFormTypes";

export default function ProjectForm({form}: { form: ResumeProject }) {

    if(form.visible){
      return (
        <div key={form.id} className="projectForm">
          <div className="projectFormProject">{form.project}</div>
          <div className="projectFormDate">
            <div className="projectFormStartDate">{form.startDate}</div>
            <div className="projectFormEndDate">{form.endDate}</div>
          </div>
          <div className="projectFormSubtitle">{form.subtitle}</div>
          <SafeHTML className="projectFormDescription" html={form.description}/>
        </div>
      );
  }
}
