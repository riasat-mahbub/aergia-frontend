import { ProfileFormHolder } from "@/types/FormHolderTypes";
import { ResumeProfile } from "@/types/ResumeFormTypes";


export default function ProfileForm({profileFormHolder}: { profileFormHolder: ProfileFormHolder }) {


  return (
    <div className="flex flex-col educationHolder">
      <div className="educationHolderTitle">{profileFormHolder.title}</div>
        {profileFormHolder.data.map((form:ResumeProfile, index) => {
        if(form.visible){
          return (
            <div key={form.id} className="profileForm">
              <div className="profileFormName">{form.name}</div>
              <div className="profileFormEmail">{form.email}</div>
              <div className="profileFormPhone">{form.phone}</div>
              <div className="profileFormUrl">{form.url}</div>
              <div className="profileFormLocation">{form.location}</div>
              <div className="profileFormSummary">{form.summary}</div>
            </div>
          );
        }

      })}
    </div>
  );
}