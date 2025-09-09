import { View, Text } from "@react-pdf/renderer";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';

export default function SkillsForm({form}: { form: ResumeSkills }) {
    if(!form.visible) return <View />;
    
    return(
        <View style={styles.skillsContainer}>
            <View style={styles.skillsRow}>
                <Text style={styles.skillName}>{form.skill}</Text>
                <Text style={styles.skillRating}>{'●'.repeat(form.rating || 0)}</Text>
            </View>
            <Text style={styles.skillDescription}>{form.description?.replace(/<[^>]*>/g, '')}</Text>
        </View>
    );
}