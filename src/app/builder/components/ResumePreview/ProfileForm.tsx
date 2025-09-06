import SafeHTML from "@/components/SafeHTML";
import { ProfileFormHolder } from "@/types/FormHolderTypes";
import { ResumeProfile } from "@/types/ResumeFormTypes";


export default function ProfileForm({profileFormHolder}: { profileFormHolder: ProfileFormHolder }) {


  return (
    <div className="flex flex-col profileFormHolder">
      {/* <div className="profileTitle">{profileFormHolder.title}</div> */}
        {profileFormHolder.data.map((form:ResumeProfile, index) => {
        if(form.visible){
          return (
            <div key={form.id} className="profileForm">
              <div className="profileFormName">{form.name}</div>
              <div className="profileFormContact">
                {form.location && <div className="profileFormLocation">{form.location}</div>}
                {form.phone && <div className="profileFormPhone">{form.phone}</div>}
                {form.email && <div className="profileFormEmail">{form.email}</div>}
                {form.url && <div className="profileFormUrl">{form.url}</div>}
              </div>
              <SafeHTML className="profileFormSummary" html={form.summary}/>
            </div>
          );
        }

      })}
    </div>
  );
}