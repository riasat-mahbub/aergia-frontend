import { ComponentType } from "react";
import { MITTemplate } from "./MITTemplate";

export const templateRegistry: Record<string, Record< string, ComponentType<any>>> = {
  mit: MITTemplate,
};