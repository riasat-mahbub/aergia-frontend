import IconPicker from "@/components/IconPicker";
import { ProfileItem } from "@/types/ResumeFormTypes";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface InfoItemEditorProps{
    idx: number;
    id: string;
    item: ProfileItem;
    handleProfileItem: (item: ProfileItem) => void;
}

export default function InfoItemEditor({idx, id, item, handleProfileItem}: InfoItemEditorProps){

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition: transform ? transition : undefined,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 40 : 1
    };
    return(
        <div key={idx} id={idx.toString()} ref={setNodeRef} style={style} className="flex flex-row items-end">
            <div className="w-11/12">
                <label className="block text-sm font-medium text-gray-700 mb-1">{item.type.charAt(0).toUpperCase() + item.type.substring(1)}</label>
                <div className="flex items-center gap-2">
                <div className="shrink-0">
                    <IconPicker
                    selectedIcon={item.icon}
                    onIconChange={(selectedIcon) => handleProfileItem({...item, 'icon': selectedIcon}) }
                    />
                </div>
                <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleProfileItem({...item, 'title': e.target.value})}
                    className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
                </div>
            </div>

            <div className="w-1/12 flex flex-col justify-between cursor-grab"  {...attributes} {...listeners} >
                <ArrowUpIcon size={24}/>
                <ArrowDownIcon size={24}/>
            </div>

        </div>
    )
}