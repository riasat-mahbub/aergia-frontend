"use client";

import { useState } from "react";
import IconInput from "./IconInput";
import { useCollapse } from "react-collapsed";
import { ChevronDown, ChevronLeft } from "lucide-react";

export default function FormHolder() {
  const [formName, setFormName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Email");

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white shadow transition-opacity duration-200">
      <div className="flex flex-row items-center gap-4 pl-4 py-4 pr-3">
        <IconInput
          value={formName}
          onChange={setFormName}
          onIconChange={setSelectedIcon}
          placeholder="Custom Form"
        />
        {isExpanded ? (
          <ChevronDown {...getToggleProps()} size={32} />
        ) : (
          <ChevronLeft {...getToggleProps()} size={32}/>
        )}
      </div>

      <div {...getCollapseProps()}>Form Content</div>
    </div>
  );
}
