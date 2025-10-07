import { ComponentType, MemoExoticComponent } from "react";
import { MITFormMap, MITTemplate } from "./MITTemplate";

import { BaseFormProps } from "./ResumePreview";

export type Template<TFormMap extends Record<string, object>> = {
  [K in keyof TFormMap]: MemoExoticComponent<ComponentType<BaseFormProps<TFormMap[K]>>>;
};

type TemplateRegistryMap = {
  MIT: MITFormMap;
};

type TemplateRegistry = {
  [TName in keyof TemplateRegistryMap]: Template<TemplateRegistryMap[TName]>;
};

export const templateRegistry: TemplateRegistry = {
  MIT: MITTemplate,
};