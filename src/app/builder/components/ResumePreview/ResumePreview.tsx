import { View } from "@react-pdf/renderer";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { templateRegistry } from "./TemplateRegistry";

export default function ResumePreview({ form }: { form: ResumeForm }) {
            
    const cvTemplate = useSelector((state: RootState) => state.forms.cvTemplate)
    const Template = cvTemplate ? templateRegistry[cvTemplate] : null;
    const TemplateForm = cvTemplate && templateRegistry[cvTemplate]?.[form.type.toLowerCase()] || null;
    
    if(!TemplateForm){
        return <View/>
    }

    return(
        <TemplateForm form={form}/>
    )
}
