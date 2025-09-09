import { View, Text } from "@react-pdf/renderer";
import { ResumeExperience } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';

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
      <Text style={styles.formLocation}>{form.location}</Text>
      <Text style={styles.formDescription}>{form.description?.replace(/<[^>]*>/g, '')}</Text>
    </View>
  );
}