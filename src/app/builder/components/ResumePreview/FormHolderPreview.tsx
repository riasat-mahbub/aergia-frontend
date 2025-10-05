import { View, Text } from "@react-pdf/renderer";
import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";
import { styles } from './pdfStyles';

interface FormHolderPreviewProps{
    formHolder: FormHolder,
    cvTemplate: string | null
}

export default function FormHolderPreview({formHolder, cvTemplate}: FormHolderPreviewProps){
   return (
       <View>
           {formHolder.type !== 'profile' && (
               <Text style={styles.sectionTitle}>
                   {formHolder.title}
               </Text>
           )}
           {formHolder.data.map((form) => (
               <ResumePreview key={form.id} form={form} cvTemplate={cvTemplate}/>
           ))}
       </View>
   );
}