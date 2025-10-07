import { ComponentType } from "react";
import { MITTemplate } from "./MITTemplate";

import { BaseFormProps } from "./ResumePreview";

// Generic type for a template: maps form keys to form components
export type Template<TFormMap extends Record<string, any>> = {
  [K in keyof TFormMap]: ComponentType<BaseFormProps<TFormMap[K]>>;
};

export const templateRegistry: Record<string, Record< string, ComponentType<any>>> = {
  MIT: MITTemplate,
};