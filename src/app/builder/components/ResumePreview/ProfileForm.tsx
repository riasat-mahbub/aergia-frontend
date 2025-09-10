import { View, Text } from "@react-pdf/renderer";
import { ResumeProfile } from "@/types/ResumeFormTypes";
import { styles } from './pdfStyles';
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";


export default function ProfileForm({form}: { form: ResumeProfile }) {
  if(!form.visible) return <View />;
  
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileName}>{form.name}</Text>
      <View style={styles.profileContact}>
        {form.location && <Text style={styles.profileContactItem}>{form.location}</Text>}
        {form.phone && <Text style={styles.profileContactItem}>{form.phone}</Text>}
        {form.email && <Text style={styles.profileContactItem}>{form.email}</Text>}
        {form.url && <Text style={styles.profileContactItem}>{form.url}</Text>}
      </View>
      <Html style={styles.formDescription}>{SafeHTML(form.summary)}</Html>
    </View>
  );
}