import { ComponentType, MemoExoticComponent } from "react";
import { MITFormMap, MITTemplate } from "../Templates/MITTemplate";
import { BaseFormProps } from "../ResumePreview/ResumePreview";
import { TEMPLATES } from "@/constants/templates";
import { HarvardFormMap, HarvardTemplate } from "./HarvardTemplate";


export type Template<TFormMap extends Record<string, object>> = {
  [K in keyof TFormMap]: MemoExoticComponent<ComponentType<BaseFormProps<TFormMap[K]>>>;
};

type TemplateRegistryMap = {
  MIT: MITFormMap;
  Harvard: HarvardFormMap;
};

type TemplateRegistry = {
  [TName in keyof TemplateRegistryMap]: Template<TemplateRegistryMap[TName]>;
};

export const templateRegistry: TemplateRegistry = {
  MIT: MITTemplate,
  Harvard: HarvardTemplate
};

// Validate that all templates in constants are supported
TEMPLATES.forEach(template => {
  if (!templateRegistry[template.value as keyof TemplateRegistry]) {
    console.warn(`Template component not found for: ${template.value}`);
  }
});