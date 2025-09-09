import { View, Text } from "@react-pdf/renderer";
import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";
import { styles } from './pdfStyles';

interface FormHolderPreviewProps{
    formHolder: FormHolder
}

export default function FormHolderPreview({formHolder}: FormHolderPreviewProps){
   return (
       <View>
           {formHolder.type !== 'profile' && (
               <Text style={styles.sectionTitle}>
                   {formHolder.title}
               </Text>
           )}
           {formHolder.data.map((form) => (
               <ResumePreview key={form.id} form={form} />
           ))}
       </View>
   );
}