import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { ResumeExperience } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";
import { BaseFormProps } from "./ResumePreview";


export default React.memo(function ExperienceForm({form, styles}: BaseFormProps<ResumeExperience>) {
  if(!form.visible) return <View />;
  
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{form.company}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.date}>{form.startDate}</Text>
          {form.startDate && form.endDate && <Text style={styles.separator}>{"-"}</Text>}
          <Text style={styles.date}>{form.endDate}</Text>
        </View>
      </View>
      <View style={styles.subTitleRow}>
        <Text style={styles.subtitle}>{form.jobTitle}</Text>
        <Text style={styles.location}>{form.location}</Text>
      </View>
      <Html style={styles.description}>{SafeHTML(form.description)}</Html>
    </View>
  );
});