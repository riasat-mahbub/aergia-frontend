import { FormHolder } from "@/types/FormHolderTypes"
import ResumePreview from "./ResumePreview";
import { useEffect, useMemo } from "react";
import { ResumeStructure } from "@/types/ResumeStructureTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";

interface FormHolderPreviewProps{
    formHolder: FormHolder
}

export default function FormHolderPreview({formHolder}: FormHolderPreviewProps){
    
    const formId = formHolder.id

    const scopedCSS = useMemo(() => {
        return Object.entries(formHolder.style || {})
            .map(([selector, rules]) => {
                const cssRules = Object.entries(rules)
                    .map(([prop, val]) => {
                        if (val === null || val === undefined || val === '') return '';
                        return `${prop}: ${val};`;
                    })
                    .filter(rule => rule.length > 0)
                    .join(" ");
                
                if (!cssRules) return '';
                return `${selector} { ${cssRules} }`;
            })
            .filter(rule => rule.length > 0)
            .join("\n");
    }, [formHolder.style]);
    
    // Create/update styles when CSS changes
    useEffect(() => {
        if (!formId || !scopedCSS.trim()) return;
        
        const styleId = `style-fh-${formId}`;
        
        // Only update if CSS content has actually changed
        const existingStyle = document.getElementById(styleId);
        if (existingStyle && existingStyle.textContent === scopedCSS) {
            return; // No change needed
        }
        
        // Remove existing style element if it exists
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Create new style element
        const styleElement = document.createElement("style");
        styleElement.id = styleId;
        styleElement.textContent = scopedCSS;
        document.head.appendChild(styleElement);
    }, [formId, scopedCSS]);
    
    // Cleanup only on component unmount
    useEffect(() => {
        const styleId = `style-fh-${formId}`;
        
        return () => {
            const elementToRemove = document.getElementById(styleId);
            if (elementToRemove) {
                elementToRemove.remove();
            }
        };
    }, [formId, formHolder.title]);

    
    
    return (
        <div className={`th-${formHolder.id}`}>
            {formHolder.type !== 'profile' && (
                <p className={`sectionTitle`}>
                    {formHolder.title}
                </p>
            )}
            
            {formHolder.data.map((form:ResumeForm) => (
                <ResumePreview key={form.id} formData={form} structure={formHolder.structure as ResumeStructure}/>
            ))}
        </div>
    );
}