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
              <h3 className="customFormTitle">{form.title}</h3>
              <div className="customFormDescription" dangerouslySetInnerHTML={{ __html: form.description }}></div>
            </div>
          );
        }

      })}
    </div>
  );
}