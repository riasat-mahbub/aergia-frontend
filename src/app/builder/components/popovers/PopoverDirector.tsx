"use client";
import { popover } from "@/constants/popovers";
import AddFormHolderPopover from "./AddFormHolderPopover";
import DeleteFormHolderPopover from "./DeleteFormHolderPopover";

interface PopoverDirectorProps {
    activePopover: popover;
    popoverData: string | null;
    onClose: () => void;
}

export default function PopoverDirector({ activePopover, onClose, popoverData }: PopoverDirectorProps) {  

  return (
    <span>
      {(() => {
        switch (activePopover) {
            case 'AddFormHolder':
                return <AddFormHolderPopover onClose={onClose} />;
            case "DeleteFormHolder":
                return <DeleteFormHolderPopover onClose={onClose} formHolderId={popoverData ? popoverData : ""} />
          default:
            return (
                <></>
            );
        }
      })()}
    </span>
  );
}