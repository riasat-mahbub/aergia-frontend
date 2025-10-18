import React, { useEffect, useState } from "react";
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

  const [infoArray, setInfoArray] = useState([form.email, form.phone, form.location])

  useEffect( () =>{
    setInfoArray(infoArray.toSorted( (a,b) => a.order-b.order))
  }, [form.email, form.phone, form.location])
  
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
                <Link style={styles.contactItem} src={normalizeUrl(url.url)}>{(url.title && url.title!=="") ? url.title : url.url}</Link>}
            </View>
          )
        })}
        
        
      </View>
      <Html style={styles.summary}>{SafeHTML(form.summary)}</Html>
    </View>
  );
});