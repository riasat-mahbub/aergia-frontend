import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { ResumeCustom } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";
import { BaseFormProps } from "./ResumePreview";




export default React.memo(function CustomForm({form, styles}: BaseFormProps<ResumeCustom>) {
    if(!form.visible) return <View />;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{form.title}</Text>
            <View style={styles.dateRow}>
                <Text style={styles.date}>{form.startDate}</Text>
                <Text style={styles.date}>{form.endDate}</Text>
            </View>
            <Text style={styles.subtitle}>{form.subtitle}</Text>
            <Text style={styles.location}>{form.location}</Text>
            <Html style={styles.description}>{SafeHTML(form.description)}</Html>
        </View>
    );
});