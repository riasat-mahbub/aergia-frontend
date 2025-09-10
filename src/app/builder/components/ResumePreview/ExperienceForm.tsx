import { View, Text } from "@react-pdf/renderer";
import { ResumeExperience } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

export default function ExperienceForm({form}: { form: ResumeExperience }) {
  if(!form.visible) return <View />;
  
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>{form.company}</Text>
      <View style={styles.formDateRow}>
        <Text style={styles.formDate}>{form.startDate}</Text>
        <Text style={styles.formDate}>{form.endDate}</Text>
      </View>
      <Text style={styles.formSubtitle}>{form.jobTitle}</Text>
      <Html style={styles.formDescription}>{SafeHTML(form.description)}</Html>
    </View>
  );
}