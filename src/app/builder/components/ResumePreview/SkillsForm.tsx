import React from "react";
import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeSkills } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

interface SkillsFormProps{
    form: ResumeSkills;
    styles: Styles;
}

export default React.memo(function SkillsForm({form, styles}: SkillsFormProps) {
    if(!form.visible) return <View />;
    
    return(
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>{form.skill}</Text>
                <Text style={styles.rating}>{'.'.repeat(form.rating || 0)}</Text>
            </View>
            <Html style={styles.description}>{SafeHTML(form.description)}</Html>
        </View>
    );
});