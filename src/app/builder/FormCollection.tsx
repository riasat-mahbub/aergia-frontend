"use client"

import { useSelector, useDispatch } from "react-redux";
import FormHolderCard from "./components/FormHolderCard"
import { RootState } from "@/store/store";
import { reorderFormHolders } from "@/store/formSlice";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

export default function FormCollection() {
  const dispatch = useDispatch();
  
  // Get forms from Redux store
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);
  
  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance before a drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      dispatch(reorderFormHolders({
        activeId: active.id.toString(),
        overId: over.id.toString()
      }));
    }
  };
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={formHolders.map(holder => holder.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="w-11/12 my-6 flex flex-col gap-4">
          {formHolders.map((formHolder) => (
            <FormHolderCard key={formHolder.id} formHolder={formHolder}/>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}