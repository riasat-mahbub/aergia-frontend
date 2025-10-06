import React from "react";
import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeProject } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

interface ProjectFormProps{
    form: ResumeProject;
    styles: Styles;
}

export default React.memo(function ProjectForm({form, styles}: ProjectFormProps) {
    if(!form.visible) return <View />;
    
    
    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{form.project}</Text>
                <View style={styles.dateRow}>
                    <Text style={styles.date}>{form.startDate}</Text>
                     {form.startDate && form.endDate && <Text style={styles.separator}>{"-"}</Text>}
                    <Text style={styles.date}>{form.endDate}</Text>
                </View>
            </View>

            <Text style={styles.subtitle}>{form.subtitle}</Text>
            <Html style={styles.description}>{SafeHTML(form.description)}</Html>
        </View>
    );
});
