"use client";
import { popover } from "@/constants/popovers";
import AddFormHolderPopover from "./AddFormHolderPopover";
import DeleteFormHolderPopover from "./DeleteFormHolderPopover";

interface AddFormHolderPopoverProps {
    activePopover: popover;
    popoverData: any;
    onClose: () => void;
}

export default function PopoverDirector({ activePopover, onClose, popoverData }: AddFormHolderPopoverProps) {  

  return (
    <span>
      {(() => {
        switch (activePopover) {
            case 'AddFormHolder':
                return <AddFormHolderPopover onClose={onClose}/>;
            case "DeleteFormHolder":
                return <DeleteFormHolderPopover onClose={onClose} formHolderId={popoverData}/>
          default:
            return (
                <></>
            );
        }
      })()}
    </span>
  );
}