import { CustomFormHolder, FormHolder } from "@/types/FormHolderTypes";
import { ResumeCustom } from "@/types/ResumeFormTypes";


export default function CustomForm({customFormHolder}: { customFormHolder: CustomFormHolder }) {


  return (
    <div className="flex flex-col customHolder">
      <div className="customHolderTitle">{customFormHolder.title}</div>
      {customFormHolder.data.map((form:ResumeCustom, index) => {
        if(form.visible){
          return (
            <div key={form.id} className="customForm" >
              <div className="customFormTitle">{form.title}</div>
              <div className="customFormDate">
                <div className="customFormStartDate">{form.startDate}</div>
                <div className="customFormEndDate">{form.endDate}</div>
              </div>
              <div className="customFormSubtitle">{form.subtitle}</div>
              <div className="customFormLocation">{form.location}</div>
              <div className="customFormDescription" dangerouslySetInnerHTML={{ __html: form.description }}></div>
            </div>
          );
        }

      })}
    </div>
  );
}