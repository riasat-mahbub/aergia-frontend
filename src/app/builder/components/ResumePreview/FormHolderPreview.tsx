"use client"

import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";

interface FormHolderPreviewProps{
    formHolder: FormHolder
}

export default function FormHolderPreview({formHolder}: FormHolderPreviewProps){

   return (
       <>
            {(() =>{
                    switch (formHolder.type) {
                        case 'custom':
                        case 'education':
                        case 'Experience':
                        case 'project':
                        case 'skills':
                            return(
                                <div className="flex flex-col FormHolder">
                                    <div className="FormHolderTitle">{formHolder.title}</div>
                                </div>
                            )
                        case 'profile':
                            return(
                                <div className="flex flex-col FormHolder"></div>
                            )
                        default:
                            return null;
                    }
            })()}

            {formHolder.data.map((form, index) => {
                return <ResumePreview key={form.id} form={form} />;
            })}
       </>
   );
}