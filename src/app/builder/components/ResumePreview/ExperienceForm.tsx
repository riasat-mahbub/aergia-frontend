import SafeHTML from "@/components/SafeHTML";
import { ExperienceFormHolder } from "@/types/FormHolderTypes";
import { ResumeExperience } from "@/types/ResumeFormTypes";

export default function ExperienceForm({form}: { form: ResumeExperience }) {

  if(form.visible){
    return (
        <div key={form.id} className="ExperienceForm">
          <div className="ExperienceFormCompany">{form.company}</div>
          <div className="ExperienceFormDate">
            <div className="ExperienceFormStartDate">  {form.startDate}</div>
            <div className="ExperienceFormEndDate">  {form.endDate}</div>
          </div>
          <div className="ExperienceFormJobTitle">{form.jobTitle}</div>
          <div className="ExperienceFormLocation">{form.location}</div>
          <SafeHTML className="ExperienceFormDescription" html={form.description}/>
        </div>
      );
    }
}