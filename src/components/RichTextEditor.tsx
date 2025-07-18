"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Undo,
  Redo,
  Trash2,
} from "lucide-react";

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
}

export default function RichTextEditor({
  content = "",
  onChange,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-20",
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col border rounded-md overflow-hidden focus:outline-none">
      <div className="flex flex-wrap justify-between border-b p-2 bg-gray-50">
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("bold") ? "bg-gray-200" : ""
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("italic") ? "bg-gray-200" : ""
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
            }`}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }`}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("bulletList") ? "bg-gray-200" : ""
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("orderedList") ? "bg-gray-200" : ""
            }`}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("codeBlock") ? "bg-gray-200" : ""
            }`}
            title="Code Block"
          >
            <Code size={16} />
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            className="p-1 rounded hover:bg-gray-200"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
            className="p-1 rounded hover:bg-gray-200"
            title="Redo"
          >
            <Redo size={16} />
          </button>
          <button
            onClick={() => editor?.chain().focus().clearContent().run()}
            className="p-1 rounded hover:bg-gray-200 text-red-500"
            title="Clear content"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className="p-2 focus:outline-none" />
    </div>
  );
}
