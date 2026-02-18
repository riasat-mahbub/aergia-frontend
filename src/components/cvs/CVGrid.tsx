import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CVCard } from "./CVCard";
import { CV } from "@/types/CvTypes";
import { useCVs } from "@/hooks/useCVs";

interface CVGridProps {
  cvs: CV[];
  openPopOver: (popOverName: string, id?: string, cv?: CV) => void;
}

export function CVGrid({ cvs, openPopOver }: CVGridProps) {
  const { reorderCvs } = useCVs();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = cvs.findIndex(cv => cv.id === active.id);
    const newIndex = cvs.findIndex(cv => cv.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newCvs = [...cvs];
    const [movedItem] = newCvs.splice(oldIndex, 1);
    newCvs.splice(newIndex, 0, movedItem);

    const updateOrder = async () => {
      try {
        await reorderCvs(active.id.toString(), over.id.toString());
      } catch (err) {
        console.error("Failed to reorder CVs:", err);
      }
    };

    void updateOrder();
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={cvs.map(cv => cv.id)} strategy={rectSortingStrategy}>
        <div  className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cvs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              openDeletePopOver={() => openPopOver("delete", cv.id)}
              openEditPopOver={() => openPopOver("edit", cv.id, cv)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
