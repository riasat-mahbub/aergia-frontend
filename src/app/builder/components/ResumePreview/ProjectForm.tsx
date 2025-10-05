import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeProject } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

interface ProjectFormProps{
    form: ResumeProject;
    styles: Styles;
}

export default function ProjectForm({form, styles}: ProjectFormProps) {
    if(!form.visible) return <View />;
    
    
    return (
        <View style={styles.formContainer}>
            <View style={styles.spaceBetween}>
                <Text style={styles.formTitle}>{form.project}</Text>
                <View style={styles.formDateRow}>
                    <Text style={styles.formDate}>{form.startDate}</Text>
                     {form.startDate && form.endDate && <Text style={styles.formDateSeperator}>{"-"}</Text>}
                    <Text style={styles.formDate}>{form.endDate}</Text>
                </View>
            </View>

            <Text style={styles.formSubtitle}>{form.subtitle}</Text>
            <Html style={styles.formDescription}>{SafeHTML(form.description)}</Html>
        </View>
    );
}
