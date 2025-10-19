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

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
        // keep links editable in the editor
        openOnClick: false,
        HTMLAttributes: {
          // for styling inside the editor (optional)
          class: "text-blue-600 underline cursor-pointer",
          target: "_blank",
          rel: "noopener noreferrer",
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

  // --- Link modal state ---
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("https://");

  // Open modal and prefill values (selected text and existing link href if any)
  const openLinkModal = () => {
    if (!editor) return;

    // get selection text if any
    const sel = editor.state.selection;
    let selectedText = "";
    try {
      selectedText = editor.state.doc.textBetween(sel.from, sel.to, " ");
    } catch {
      selectedText = "";
    }

    // if the current selection/cursor has a link mark, try to read its href
    const attrs = editor.getAttributes("link");
    const existingHref = (attrs && (attrs as any).href) || "";

    setLinkText(selectedText || "");
    setLinkUrl(existingHref || "https://");
    setShowLinkModal(true);
  };

  const closeLinkModal = () => {
    setShowLinkModal(false);
  };

  // Save link: insert or replace selection with <a href="...">text</a>
  const saveLink = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editor) return;

    // normalize url and text
    const url = linkUrl?.trim();
    const text = (linkText?.trim() || linkUrl?.trim() || "").trim();
    if (!url) {
      // nothing to do
      setShowLinkModal(false);
      return;
    }

    // escape to avoid injecting HTML accidentally
    const escapedText = escapeHtml(text);
    const escapedUrl = escapeHtml(url);

    // Insert an anchor HTML snippet — insertContent replaces selection
    // Tiptap supports inserting raw HTML fragments here.
    const html = `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapedText}</a>`;

    editor.chain().focus().insertContent(html).run();

    setShowLinkModal(false);
  };

  // Remove link mark from selection (if any)
  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkModal(false);
  };

  if (!isMounted) return null;

  // ---------------- UI ----------------
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

          {/* Insert Link (opens modal) */}
          <button
            onClick={openLinkModal}
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

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="focus:outline-none [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:my-0 [&_ol]:my-0 [&_li]:my-0 [&_p]:my-0"
      />

      {/* Link modal (simple inline modal) */}
      {showLinkModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeLinkModal}
            aria-hidden
          />

          <form
            onSubmit={saveLink}
            className="relative z-10 w-full max-w-md bg-white rounded shadow p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-medium mb-2">Insert link</h3>

            <label className="block text-xs mb-1">
              Display text
              <input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                placeholder="visible text (optional)"
              />
            </label>

            <label className="block text-xs mb-2">
              URL
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="mt-1 block w-full border rounded px-2 py-1 text-sm"
                placeholder="https://example.com"
                required
              />
            </label>

            <div className="flex gap-2 justify-end mt-3">
              <button
                type="button"
                onClick={removeLink}
                className="px-3 py-1 text-sm rounded border text-red-600"
              >
                Remove link
              </button>

              <button
                type="button"
                onClick={closeLinkModal}
                className="px-3 py-1 text-sm rounded border"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
