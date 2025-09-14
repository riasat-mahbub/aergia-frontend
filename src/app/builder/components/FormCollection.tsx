"use client"

import { useSelector, useDispatch } from "react-redux";
import FormHolderCard from "./FormHolderCard"
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
import { useFormHolders } from "@/hooks/useFormHolders";

export default function FormCollection() {
  const dispatch = useDispatch();
  const cvId = useSelector((state: RootState) => state.forms.cvId);
  const { reorderFormHolder } = useFormHolders(cvId);
  
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Handle drag end event
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      try {
        await reorderFormHolder(active.id.toString(), over.id.toString());
        
        dispatch(reorderFormHolders({
          activeId: active.id.toString(),
          overId: over.id.toString()
        }));
      } catch (error) {
        console.error('Failed to reorder form holders:', error);
      }
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