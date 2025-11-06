import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";
import { useEffect, useMemo } from "react";
import { ResumeStructure } from "@/types/ResumeStructureTypes";

interface FormHolderPreviewProps{
    formHolder: FormHolder
}

export default function FormHolderPreview({formHolder}: FormHolderPreviewProps){
    
    const generateScopedCSS = (scope: string, styleJson: Record<string, any>) => {
        return Object.entries(styleJson)
            .map(([selector, rules]) => {
                const cssRules = Object.entries(rules).map(([prop, val]) => `${prop}: ${val};`).join(" ");
                return `${scope} ${selector} { ${cssRules} }`;
            })
            .join("\n");
    }

    const formId = formHolder.id

    const scopedCSS = useMemo(
        () => generateScopedCSS(`.${formId}`, formHolder.style),
        [formId, formHolder.style]
    );

    useEffect(() => {
        if (!formId || !formHolder.style) return;
        const styleElement = document.createElement("style");
        styleElement.id = `style-${formId}`;
        styleElement.textContent = scopedCSS;
        document.head.appendChild(styleElement);
        return () => styleElement.remove();
    }, [scopedCSS, formId]);

    
    
    return (
        <div className={`${formId}`}>
            {formHolder.type !== 'profile' && (
                <p className={`sectionTitle`}>
                    {formHolder.title}
                </p>
            )}
            
            {formHolder.data.map((form) => (
                <ResumePreview key={form.id} formData={form} structure={formHolder.structure as ResumeStructure}/>
            ))}
        </div>
    );
}