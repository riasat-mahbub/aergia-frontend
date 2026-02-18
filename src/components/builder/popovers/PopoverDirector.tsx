import { popover } from "@/constants/popovers";
import AddFormHolderPopover from "./AddFormHolderPopover";
import DeleteFormHolderPopover from "./DeleteFormHolderPopover";

interface PopoverDirectorProps {
  activePopover: popover;
  popoverData: string | null;
  onClose: () => void;
}

export default function PopoverDirector({ activePopover, popoverData, onClose }: PopoverDirectorProps) {
  if (!activePopover) return null;

  switch (activePopover) {
    case "AddFormHolder":
      return <AddFormHolderPopover onClose={onClose} />;
    
    case "DeleteFormHolder":
      if (!popoverData) return null;
      return <DeleteFormHolderPopover formHolderId={popoverData} onClose={onClose} />;
    
    default:
      return null;
  }
}
