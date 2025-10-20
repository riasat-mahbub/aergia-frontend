import { View, Text, Styles, StyleSheet } from "@react-pdf/renderer";
import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";
import { templateStyleRegistry } from "../TemplateStyles/TemplateStyleRegistry";

interface FormHolderPreviewProps{
    formHolder: FormHolder,
    cvTemplate: string | null
}

export default function FormHolderPreview({formHolder, cvTemplate}: FormHolderPreviewProps){
    
    const formStyles = StyleSheet.create(formHolder.style as Styles);
    const formHolderStyle = StyleSheet.create((cvTemplate && templateStyleRegistry[cvTemplate]?.['formholder'] || {}) as Styles);
    
    console.log(formHolderStyle)
    return (
        <View>
            {formHolder.type !== 'profile' && (
                <Text style={formHolderStyle.title}>
                    {formHolder.title}
                </Text>
            )}
            {formHolder.data.map((form) => (
                <ResumePreview key={form.id} form={form} cvTemplate={cvTemplate} styles={formStyles}/>
            ))}
        </View>
    );
}