"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
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
  Link as LinkIcon,
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
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "text-sm leading-relaxed focus:outline-none min-h-24 p-3 max-w-none",
      },
    },

  });

  // Handle SSR-safe mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🔄 Sync incoming content updates
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!isMounted) return null;

  // 🔗 Insert / Edit Link Handler
  const handleSetLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Enter a URL", previousUrl || "https://");
    if (url === null) return; // cancel

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="flex flex-col border rounded-md overflow-hidden focus:outline-none bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap justify-between border-b p-2 bg-gray-50">
        <div className="flex gap-1 flex-wrap">
          {/* Bold */}
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            aria-label="Bold"
            aria-pressed={editor?.isActive("bold")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("bold") ? "bg-gray-200" : ""
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>

          {/* Italic */}
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor?.can().chain().focus().toggleItalic().run()}
            aria-label="Italic"
            aria-pressed={editor?.isActive("italic")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("italic") ? "bg-gray-200" : ""
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>

          {/* Headings */}
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            aria-label="Heading 1"
            aria-pressed={editor?.isActive("heading", { level: 1 })}
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
            aria-label="Heading 2"
            aria-pressed={editor?.isActive("heading", { level: 2 })}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }`}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>

          {/* Lists */}
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            aria-label="Bullet List"
            aria-pressed={editor?.isActive("bulletList")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("bulletList") ? "bg-gray-200" : ""
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            aria-label="Ordered List"
            aria-pressed={editor?.isActive("orderedList")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("orderedList") ? "bg-gray-200" : ""
            }`}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </button>

          {/* Code block */}
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            aria-label="Code Block"
            aria-pressed={editor?.isActive("codeBlock")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("codeBlock") ? "bg-gray-200" : ""
            }`}
            title="Code Block"
          >
            <Code size={16} />
          </button>

          {/* Insert Link */}
          <button
            onClick={handleSetLink}
            aria-label="Insert Link"
            aria-pressed={editor?.isActive("link")}
            className={`p-1 rounded hover:bg-gray-200 ${
              editor?.isActive("link") ? "bg-gray-200" : ""
            }`}
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </button>
        </div>

        {/* Undo / Redo / Clear */}
        <div className="flex gap-1">
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            aria-label="Undo"
            className="p-1 rounded hover:bg-gray-200"
            title="Undo"
          >
            <Undo size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
            aria-label="Redo"
            className="p-1 rounded hover:bg-gray-200"
            title="Redo"
          >
            <Redo size={16} />
          </button>

          <button
            onClick={() => editor?.chain().focus().clearContent().run()}
            aria-label="Clear Content"
            className="p-1 rounded hover:bg-gray-200 text-red-500"
            title="Clear content"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className="focus:outline-none [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:my-0 [&_ol]:my-0 [&_li]:my-0 [&_p]:my-0"/>


    </div>
  );
}
