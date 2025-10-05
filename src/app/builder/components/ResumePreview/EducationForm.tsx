import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeEducation } from "@/types/ResumeFormTypes";
import Html from 'react-pdf-html';
import SafeHTML from "@/components/SafeHTML";

interface EducationFormProps{
    form: ResumeEducation;
    styles: Styles;
}

export default function EducationForm({form, styles}: EducationFormProps) {
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
      <Html style={styles.formDescription}>{SafeHTML(form.description)}</Html>
    </View>
  );
}