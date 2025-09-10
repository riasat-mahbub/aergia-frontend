import { View, Text } from "@react-pdf/renderer";
import { ResumeProject } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';

export default function ProjectForm({form}: { form: ResumeProject }) {
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
            <Text style={styles.formDescription}>{form.description?.replace(/<[^>]*>/g, '')}</Text>
        </View>
    );
}
