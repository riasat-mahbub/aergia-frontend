import { View, Text } from "@react-pdf/renderer";
import { ResumeEducation } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';
import Html from 'react-pdf-html';
import SafeHTML from "@/components/SafeHTML";



export default function EducationForm({form}: { form: ResumeEducation }) {
  if(!form.visible) return <View />;
  return (
    <View style={styles.formContainer}>

      <View style={styles.spaceBetween}>
        <Text style={styles.formTitle}>{form.school}</Text>
        <View style={styles.formDateRow}>
          <Text style={styles.formDate}>{form.startDate}</Text>
          {form.startDate && form.endDate && <Text style={styles.formDateSeperator}>{"-"}</Text>}
          <Text style={styles.formDate}>{form.endDate}</Text>
        </View>
      </View>
      <View style={styles.spaceBetween}>
        <Text style={styles.formSubtitle}>{form.degree}</Text>
        <Text style={styles.formLocation}>{form.location}</Text>
      </View>
      <Text style={styles.educationGPA}>GPA: {form.gpa}</Text>
      <Text>{form.description}</Text>
      <Html style={styles.formDescription}>{SafeHTML(form.description)}</Html>
    </View>
  );
}