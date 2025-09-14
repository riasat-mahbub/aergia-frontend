import { FormHolder } from "@/types/FormHolderTypes";
import { v4 as uuidv4 } from "uuid";



/**
 * Creates a new form holder with a unique ID
 */
export const createFormHolder = (
  title: string,
  icon: string,
  type: string,
  data: any[] = [],
  visible: boolean = true,
  order: number,
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
