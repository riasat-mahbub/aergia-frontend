import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

interface SkillsFormProps{
    form: ResumeSkills;
    styles: Styles;
}

export default function SkillsForm({form, styles}: SkillsFormProps) {
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