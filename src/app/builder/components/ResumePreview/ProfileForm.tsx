import React from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { ResumeProfile } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";
import { BaseFormProps } from "./ResumePreview";
import { LucidePdfIcon } from "./LucidePdfIcon";


export default React.memo(function ProfileForm({form, styles}: BaseFormProps<ResumeProfile>) {
  if(!form.visible) return <View />;

  const normalizeUrl = (url: string) => {
    if (!url) return "";
    
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }

    return url;
  };

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

        {form.urls.map( (url, idx) => {
          return(
            <View style={styles.contactRow} key={idx}>
              {url.urlIcon && <LucidePdfIcon name={url.urlIcon} style={styles.contactIcon}/>}
              {url.url && 
                <Link style={styles.contactItem} src={normalizeUrl(url.url)}>{(url.title && url.title!=="") ? url.title : url.url}</Link>}
            </View>
          )
        })}
        
        
      </View>
      <Html style={styles.summary}>{SafeHTML(form.summary)}</Html>
    </View>
  );
});