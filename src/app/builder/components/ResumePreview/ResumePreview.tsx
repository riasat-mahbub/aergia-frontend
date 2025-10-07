import { Styles, StyleSheet, View } from "@react-pdf/renderer";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { templateRegistry } from "./TemplateRegistry";
import { ComponentType } from "react";

interface ResumePreviewProps{
    form: ResumeForm;
    cvTemplate: string | null;
    styles: Styles;
}

export interface BaseFormProps<T>{
    form: T;
    styles: Styles;
}

export default function ResumePreview({ form, cvTemplate, styles }: ResumePreviewProps) {
   
    const template = cvTemplate 
        ? templateRegistry[cvTemplate as keyof typeof templateRegistry]
        : null;
    
    const TemplateForm = template 
        ? template[form.type.toLowerCase() as keyof typeof template]
        : null;
    
    const ResumeStyle = StyleSheet.create(styles);
   
    if(!TemplateForm){
        return <View/>
    }
   
    const Component = TemplateForm as ComponentType<BaseFormProps<ResumeForm>>;
   
    return(
        <Component form={form} styles={ResumeStyle}/>
    )
}