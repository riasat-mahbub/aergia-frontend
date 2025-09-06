import { WorkExperienceFormHolder } from "@/types/FormHolderTypes";
import { ResumeWorkExperience } from "@/types/ResumeFormTypes";

export default function WorkExperienceForm({workExperienceFormHolder}: { workExperienceFormHolder: WorkExperienceFormHolder }) {

  return (
    <div className="flex flex-col workExperienceHolder">
      <div className="workExperienceHolderTitle">{workExperienceFormHolder.title}</div>
      {workExperienceFormHolder.data.map((form: ResumeWorkExperience, index) => {
        if(form.visible){
          return (
            <div key={form.id} className="workExperienceForm">
              <div className="workExperienceFormCompany">{form.company}</div>
              <div className="workExperienceFormLocation">{form.location}</div>
              <div className="workExperienceFormJobTitle">{form.jobTitle}</div>
              <div className="workExperienceFormDate">{form.date}</div>
              <div className="workExperienceFormDescription">{form.description}</div>
            </div>
          );
          }

      })}
    </div>
  );
}