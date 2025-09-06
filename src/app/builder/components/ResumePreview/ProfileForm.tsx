import SafeHTML from "@/components/SafeHTML";
import { ResumeProfile } from "@/types/ResumeFormTypes";


export default function ProfileForm({form}: { form: ResumeProfile }) {
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
}