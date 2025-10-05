import { View } from "@react-pdf/renderer";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { templateRegistry } from "./TemplateRegistry";
import { FormTypeMap } from "@/types/FormHolderTypes";

interface ResumePreviewProps{
    form: ResumeForm;
    cvTemplate: string | null;
}

export default function ResumePreview({ form, cvTemplate }: ResumePreviewProps) {
            
    const TemplateForm = cvTemplate ? templateRegistry[cvTemplate]?.[form.type.toLowerCase()] : null;
    const typeKey = form.type as keyof FormTypeMap;
    
    if(!TemplateForm){
        return <View/>
    }

    return(
        <TemplateForm form={form as FormTypeMap[typeof typeKey]}/>
    )
}
