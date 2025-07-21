import { FormHolder } from "@/types/FormHolderTypes";
import { v4 as uuidv4 } from "uuid";
import {
  emptyCustom,
  emptyProfile,
} from "./resumeFormTemplates";


export const defaultFormHolder: FormHolder =
  {
    id: uuidv4(),
    title: "Personal Information",
    icon: "Person",
    type: "personal",
    data: [emptyCustom],
    visible: true
  };

/**
 * Creates a new form holder with a unique ID
 */
export const createFormHolder = (
  title: string,
  icon: string,
  type: string,
  data: any[] = [],
  visible: boolean = true
): FormHolder => {
  return {
    id: uuidv4(),
    title,
    icon,
    type,
    data,
    visible
  };
};
