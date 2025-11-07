import { FormHolder } from "@/types/FormHolderTypes";
import { ResumeForm } from "@/types/ResumeFormTypes";
import { v4 as uuidv4 } from "uuid";



/**
 * Creates a new form holder with a unique ID
 */

export const createFormHolder = (
  title: string,
  icon: string,
  type: string,
  data: ResumeForm[] = [],
  visible: boolean = true,
  order: number = 0,
): FormHolder => {
  return {
    id: uuidv4(),
    title,
    icon,
    type,
    data,
    visible,
    order
  };
};
