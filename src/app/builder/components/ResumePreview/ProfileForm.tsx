import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Link } from "@react-pdf/renderer";
import { ProfileItem, ResumeProfile } from "@/types/ResumeFormTypes";
import Html from "react-pdf-html";
import SafeHTML from "@/components/SafeHTML";
import { BaseFormProps } from "./ResumePreview";
import { LucidePdfIcon } from "./LucidePdfIcon";


export default React.memo(function ProfileForm({form, styles}: BaseFormProps<ResumeProfile>) {

  const normalizeUrl = (url: string) => {
    if (!url) return "";
    
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }

    return url;
  };

  const makeInitial = useCallback(() => {
    const arr = [
      { ...form.email },
      { ...form.phone },
      { ...form.location }
    ];
    return arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [form.email, form.phone, form.location]) 

  const [infoArray, setInfoArray] = useState<ProfileItem[]>(makeInitial);

  useEffect(() => {
    setInfoArray(makeInitial());
  }, [form.email, form.phone, form.location, makeInitial]);

  
  if(!form.visible) return <View />;
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{form.name}</Text>
      <View style={styles.contactRow}>
        {
          infoArray.map( (info, idx) =>{
            return(
              <View style={styles.contactRow} key={idx}>
                {info.icon && form.location && <LucidePdfIcon name={info.icon} style={styles.contactIcon}/>}
                {info.title && <Text style={styles.contactItem}>{info.title}</Text>}
              </View>
            )
          })
        }

        {form.urls.map( (url, idx) => {
          return(
            <View style={styles.contactRow} key={idx}>
              {url.icon && <LucidePdfIcon name={url.icon} style={styles.contactIcon}/>}
              {url.url && 
                <Link style={styles.contactUrl} src={normalizeUrl(url.url)}>{(url.title && url.title!=="") ? url.title : url.url}</Link>}
            </View>
          )
        })}
        
        
      </View>
      <Html style={styles.summary}>{SafeHTML(form.summary)}</Html>
    </View>
  );
});