import { View, Text } from "@react-pdf/renderer";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

export default function SkillsForm({form}: { form: ResumeSkills }) {
    if(!form.visible) return <View />;
    
    return(
        <View style={styles.skillsContainer}>
            <View style={styles.skillsRow}>
                <Text style={styles.skillName}>{form.skill}</Text>
                <Text style={styles.skillRating}>{'.'.repeat(form.rating || 0)}</Text>
            </View>
            <Html style={styles.formDescription}>{SafeHTML(form.description)}</Html>
        </View>
    );
}