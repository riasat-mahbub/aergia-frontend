"use client";

import { useDispatch } from "react-redux";
import { popover } from "../../LeftSide";
import AddFormHolderPopover from "./AddFormHolderPopover";

interface AddFormHolderPopoverProps {
    activePopover: popover;
    onClose: () => void;
}

export default function PopoverDirector({ activePopover, onClose }: AddFormHolderPopoverProps) {  

  return (
    <span>
      {(() => {
        switch (activePopover) {
            case 'AddFormHolder':
                return <AddFormHolderPopover onClose={onClose}/>;
            
            
          default:
            return (
                <></>
            );
        }
      })()}
    </span>
  );
}