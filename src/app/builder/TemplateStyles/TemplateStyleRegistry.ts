import { HarvardStyle } from "./HarvardStyle";
import { MITStyle } from "./MITStyle";

export const templateStyleRegistry: Record<
  string,
  Record<string, object>
> = {
  MIT: MITStyle,
  Harvard: HarvardStyle
};
