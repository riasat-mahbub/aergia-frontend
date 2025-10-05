import { Styles, StyleSheet, View } from "@react-pdf/renderer";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { templateRegistry } from "./TemplateRegistry";
import { FormTypeMap } from "@/types/FormHolderTypes";

interface ResumePreviewProps{
    form: ResumeForm;
    cvTemplate: string | null;
    styles: Styles;
}

export default function ResumePreview({ form, cvTemplate, styles }: ResumePreviewProps) {
    
    const typeKey = form.type as keyof FormTypeMap;
    const TemplateForm = cvTemplate ? templateRegistry[cvTemplate]?.[form.type.toLowerCase()] : null;

    const ResumeStyle = styles ? StyleSheet.create(styles) : null;
    
    if(!TemplateForm){
        return <View/>
    }

    return(
        <TemplateForm form={form as FormTypeMap[typeof typeKey]} styles={ResumeStyle}/>
    )
}
