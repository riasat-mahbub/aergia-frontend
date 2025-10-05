import React from "react";
import { View, Text, Styles } from "@react-pdf/renderer";
import { ResumeProfile } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";

interface ProfileFormProps{
    form: ResumeProfile;
    styles: Styles;
}


export default React.memo(function ProfileForm({form, styles}: ProfileFormProps) {
  if(!form.visible) return <View />;
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{form.name}</Text>
      <View style={styles.contactRow}>
        {form.location && <Text style={styles.contactItem}>{form.location}</Text>}
        {form.phone && <Text style={styles.contactItem}>{form.phone}</Text>}
        {form.email && <Text style={styles.contactItem}>{form.email}</Text>}
        {form.url && <Text style={styles.contactItem}>{form.url}</Text>}
      </View>
      <Html style={styles.summary}>{SafeHTML(form.summary)}</Html>
    </View>
  );
});