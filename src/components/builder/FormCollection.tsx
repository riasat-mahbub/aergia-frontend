import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFormHolders } from "@/hooks/useFormHolders";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { reorderFormHolders } from "@/store/formSlice";
import FormHolderCard from "./FormHolderCard/FormHolderCard";

interface FormCollectionProps {
  onDeleteFormHolder: (formHolderId: string) => void;
}

export default function FormCollection({ onDeleteFormHolder }: FormCollectionProps) {
  const dispatch = useDispatch();
  const { reorderFormHolder } = useFormHolders();
  
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    dispatch(reorderFormHolders({ activeId, overId }));

    const reorder = async () => {
      try {
        await reorderFormHolder(activeId, overId);
      } catch (err) {
        console.error("Failed to reorder form holders:", err);
      }
    };

    void reorder();
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={formHolders.map(holder => holder.id)} strategy={rectSortingStrategy}>
        <div className="grid gap-4 grid-cols-1 w-full max-w-md pt-8">
          {formHolders.map((formHolder) => (
            <FormHolderCard
              key={formHolder.id}
              formHolder={formHolder}
              onDelete={onDeleteFormHolder}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
