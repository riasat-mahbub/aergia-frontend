import { HarvardStyle } from "./HarvardStyle";
import { MITStyle } from "./MITStyle";

import { TEMPLATES } from "@/constants/templates";

export const templateStyleRegistry: Record<
  string,
  Record<string, object>
> = {
  MIT: MITStyle,
  Harvard: HarvardStyle
};

// Validate that all templates in constants are supported
TEMPLATES.forEach(template => {
  if (!templateStyleRegistry[template.value]) {
    console.warn(`Template style not found for: ${template.value}`);
  }
});
