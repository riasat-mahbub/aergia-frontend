import { ProfileItem, ResumeURL } from '@/types/ResumeFormTypes';
import { Trash2, Plus } from 'lucide-react';
import IconPicker from '@/components/IconPicker';

interface InfoItemEditorProps {
  items: ProfileItem[];
  onChange: (items: ProfileItem[]) => void;
  itemType: 'info' | 'url';
}

export default function InfoItemEditor({ items, onChange, itemType }: InfoItemEditorProps) {
  const handleAdd = () => {
    const newItem: ProfileItem = {
      title: '',
      order: items.length,
      icon: '',
      type: itemType === 'url' ? 'url' : 'text',
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (index: number, updatedItem: ProfileItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    onChange(newItems);
  };

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleIconChange = (index: number, icon: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], icon };
    onChange(newItems);
  };

  const isUrlItem = (item: ProfileItem): item is ResumeURL => {
    return 'url' in item;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 capitalize">{itemType}s</label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
        >
          <Plus size={14} />
          Add {itemType}
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-md">
          <div className="flex-shrink-0">
            <IconPicker
              selectedIcon={item.icon}
              onIconChange={(icon) => handleIconChange(index, icon)}
            />
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleUpdate(index, { ...item, title: e.target.value })}
              placeholder="Label"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />

            {itemType === 'url' && isUrlItem(item) && (
              <input
                type="url"
                value={(item as ResumeURL).url || ''}
                onChange={(e) =>
                  handleUpdate(index, { ...item, url: e.target.value } as ResumeURL)
                }
                placeholder="URL"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            )}

            <select
              value={item.type}
              onChange={(e) => handleUpdate(index, { ...item, type: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="text">Text</option>
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleDelete(index)}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
