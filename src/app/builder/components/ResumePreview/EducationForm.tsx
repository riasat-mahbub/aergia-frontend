import { EducationFormHolder } from "@/types/FormHolderTypes";
import { ResumeEducation } from "@/types/ResumeFormTypes";


export default function EducationForm({eduFormHolder}: { eduFormHolder: EducationFormHolder }) {


  return (
    <div className="flex flex-col educationHolder">
      <div className="educationHolderTitle">{eduFormHolder.title}</div>
        {eduFormHolder.data.map((form:ResumeEducation, index) => {
        return (
          <div key={form.id} className="educationForm">
            <div className="educationFormDegree">{form.degree}</div>
            <div className="educationFormSchool">{form.school}</div>
            <div className="educationFormDescription">{form.description}</div>
            <div className="educationFormDate">{form.date}</div>
            <div className="educationFormGPA">{form.gpa}</div>
          </div>
        );
      })}
    </div>
  );
}