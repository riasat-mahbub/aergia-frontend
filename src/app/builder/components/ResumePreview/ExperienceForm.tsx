import { ExperienceFormHolder } from "@/types/FormHolderTypes";
import { ResumeExperience } from "@/types/ResumeFormTypes";

export default function ExperienceForm({ExperienceFormHolder}: { ExperienceFormHolder: ExperienceFormHolder }) {

  return (
    <div className="flex flex-col ExperienceHolder">
      <div className="ExperienceHolderTitle">{ExperienceFormHolder.title}</div>
      {ExperienceFormHolder.data.map((form: ResumeExperience, index) => {
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
              <div className="ExperienceFormDescription">{form.description}</div>
            </div>
          );
          }

      })}
    </div>
  );
}