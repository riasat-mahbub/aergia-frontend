import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { ResumeProfile } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";
import { BaseFormProps } from "./ResumePreview";
import { LucidePdfIcon } from "./LucidePdfIcon";


export default React.memo(function ProfileForm({form, styles}: BaseFormProps<ResumeProfile>) {
  if(!form.visible) return <View />;
  console.log(form)
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{form.name}</Text>
      <View style={styles.contactRow}>
        <View style={styles.contactRow}>
          {form.locationIcon && form.location && <LucidePdfIcon name={form.locationIcon} style={styles.contactIcon}/>}
          {form.location && <Text style={styles.contactItem}>{form.location}</Text>}
        </View>

        <View style={styles.contactRow}>
          {form.phoneIcon && form.phone && <LucidePdfIcon name={form.phoneIcon} style={styles.contactIcon}/>}
          {form.phone && <Text style={styles.contactItem}>{form.phone}</Text>}
        </View>

        <View style={styles.contactRow}>
          {form.emailIcon && <LucidePdfIcon name={form.emailIcon} style={styles.contactIcon}/>}
          {form.email && <Text style={styles.contactItem}>{form.email}</Text>}
        </View>
        
        <View style={styles.contactRow}>
          {form.urlIcon && <LucidePdfIcon name={form.urlIcon} style={styles.contactIcon}/>}
          {form.url && <Text style={styles.contactItem}>{form.url}</Text>}
        </View>
      </View>
      <Html style={styles.summary}>{SafeHTML(form.summary)}</Html>
    </View>
  );
});