import SafeHTML from "@/components/SafeHTML";
import { EducationFormHolder } from "@/types/FormHolderTypes";
import { ResumeEducation } from "@/types/ResumeFormTypes";


export default function EducationForm({form}: { form: ResumeEducation }) {

  if(form.visible){
    return (
      <div key={form.id} className="educationForm">
        <div className="educationFormSchool">{form.school}</div>
        <div className="educationFormDate">
          <div className="educationFormStartDate">  {form.startDate}</div>
          <div className="educationFormEndDate">  {form.endDate}</div>
        </div>
        <div className="educationFormDegree">{form.degree}</div>
        <div className="educationFormLocation">{form.location}</div>
        <div className="educationFormGPA">{form.gpa}</div>
        <SafeHTML className="educationFormDescription" html={form.description}/>
      </div>
    );
}
}