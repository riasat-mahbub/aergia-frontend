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
                const cssRules = Object.entries(rules)
                    .map(([prop, val]) => {
                        if (val === null || val === undefined || val === '') return '';
                        return `${prop}: ${val};`;
                    })
                    .filter(rule => rule.length > 0)
                    .join(" ");
                
                if (!cssRules) return '';
                return `${scope} ${selector} { ${cssRules} }`;
            })
            .filter(rule => rule.length > 0)
            .join("\n");
    }

    const formId = formHolder.id
    const cssId = `fh-${formId}` // Prefix to ensure valid CSS selector

    const scopedCSS = useMemo(
        () => generateScopedCSS(`.${cssId}`, formHolder.style),
        [cssId, formHolder.style]
    );
    
    // Create/update styles when CSS changes
    useEffect(() => {
        if (!formId || !scopedCSS.trim()) return;
        
        const styleId = `style-${cssId}`;
        
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
        const styleId = `style-${cssId}`;
        
        return () => {
            const elementToRemove = document.getElementById(styleId);
            if (elementToRemove) {
                elementToRemove.remove();
            }
        };
    }, [cssId, formHolder.title]);

    
    
    return (
        <div className={`${cssId}`}>
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