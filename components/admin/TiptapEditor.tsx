"use client";

import {
  useEditor,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useRef, useState } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, Heading4, Type,
  List, ListOrdered, Quote, Code2, Minus,
  Link as LinkIcon, Link2Off, ImagePlus,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Undo2, Redo2, Loader2,
} from "lucide-react";

/* ── Resizable Image Node View ────────────────────── */
function ResizableImageView({ node, updateAttributes, selected }: NodeViewProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = wrapRef.current?.offsetWidth ?? 400;
    setIsResizing(true);

    const onMove = (ev: MouseEvent) => {
      const newW = Math.max(80, startW + (ev.clientX - startX));
      updateAttributes({ width: newW });
    };
    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const w = node.attrs.width;
  const isActive = selected || isResizing;

  return (
    <NodeViewWrapper className="block my-4">
      <div
        ref={wrapRef}
        className={`relative inline-block group mx-auto cursor-default rounded-xl transition-all ${
          isActive ? "ring-2 ring-green-500 ring-offset-2" : "hover:ring-1 hover:ring-gray-300 hover:ring-offset-1"
        }`}
        style={{ width: w ? `${w}px` : "100%", maxWidth: "100%" }}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          className="w-full h-auto rounded-xl block pointer-events-none select-none"
          draggable={false}
        />

        {/* Right resize handle */}
        <div
          onMouseDown={startResize}
          title="Drag to resize"
          className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-14 bg-green-500 hover:bg-green-600 rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100 shadow-lg transition-opacity z-10 flex flex-col items-center justify-center gap-0.5"
        >
          <div className="w-0.5 h-2 bg-white/80 rounded-full" />
          <div className="w-0.5 h-2 bg-white/80 rounded-full" />
          <div className="w-0.5 h-2 bg-white/80 rounded-full" />
        </div>

        {/* Width badge */}
        {isActive && w && (
          <div className="absolute bottom-2 right-2 bg-black/65 text-white text-[10px] px-2 py-0.5 rounded-full font-mono pointer-events-none select-none">
            {w}px
          </div>
        )}

        {/* Hover hint */}
        {!isActive && (
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity">
            Drag right edge to resize
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}

/* ── Custom Image Extension ───────────────────────── */
const ResizableImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => {
          const raw = el.getAttribute("width") || el.style.width;
          if (!raw) return null;
          return parseInt(raw);
        },
        renderHTML: (attrs) => {
          if (!attrs.width) return {};
          return { width: attrs.width, style: `width: ${attrs.width}px; max-width: 100%;` };
        },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

/* ── Toolbar helpers ──────────────────────────────── */
interface BtnProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function Btn({ onClick, active, disabled, title, children }: BtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        w-8 h-8 flex items-center justify-center rounded-lg transition-colors text-sm shrink-0
        ${active ? "bg-green-100 text-green-700 font-semibold" : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"}
        ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-gray-300 mx-0.5 shrink-0" />;
}

function GroupLabel({ label }: { label: string }) {
  return <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mx-1 hidden lg:block">{label}</span>;
}

/* ── Status bar ───────────────────────────────────── */
function StatusBar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;
  const text = editor.getText();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-1.5 flex items-center justify-between text-[11px] text-gray-400 select-none">
      <span>{words} words &middot; {chars} characters</span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        Rich Text Editor
      </span>
    </div>
  );
}

/* ── Main TiptapEditor component ──────────────────── */
interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
}: TiptapEditorProps) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-green-600 underline underline-offset-2 cursor-pointer",
          rel: "noopener noreferrer",
        },
      }),
      ResizableImage.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const handleLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = window.prompt("Enter link URL (e.g. https://example.com):");
      if (url) editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const handleImage = useCallback(async () => {
    if (!editor || uploading) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        }
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }, [editor, uploading]);

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <div className="h-14 bg-gray-50 border-b border-gray-200 animate-pulse" />
        <div className="h-128 bg-white animate-pulse" />
        <div className="h-8 bg-gray-50 border-t border-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all shadow-sm">

      {/* ── Toolbar ───────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 px-2 py-2 flex flex-wrap gap-0.5 items-center">

        {/* History */}
        <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
          <Undo2 size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)">
          <Redo2 size={14} />
        </Btn>
        <Sep />

        {/* Text marks */}
        <GroupLabel label="Format" />
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)">
          <Bold size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)">
          <Italic size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)">
          <UnderlineIcon size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough size={14} />
        </Btn>
        <Sep />

        {/* Block type */}
        <GroupLabel label="Block" />
        <Btn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} title="Paragraph">
          <Type size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
          <Heading1 size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          <Heading2 size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          <Heading3 size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4">
          <Heading4 size={14} />
        </Btn>
        <Sep />

        {/* Lists */}
        <GroupLabel label="List" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
          <List size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
          <ListOrdered size={14} />
        </Btn>
        <Sep />

        {/* Blocks */}
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <Quote size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
          <Code2 size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Divider">
          <Minus size={14} />
        </Btn>
        <Sep />

        {/* Alignment */}
        <GroupLabel label="Align" />
        <Btn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
          <AlignLeft size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
          <AlignCenter size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
          <AlignRight size={14} />
        </Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">
          <AlignJustify size={14} />
        </Btn>
        <Sep />

        {/* Link & Image */}
        <GroupLabel label="Insert" />
        <Btn onClick={handleLink} active={editor.isActive("link")} title={editor.isActive("link") ? "Remove Link" : "Insert Link"}>
          {editor.isActive("link") ? <Link2Off size={14} /> : <LinkIcon size={14} />}
        </Btn>
        <Btn onClick={handleImage} disabled={uploading} title="Upload & Insert Image">
          {uploading
            ? <Loader2 size={14} className="animate-spin" />
            : <ImagePlus size={14} />
          }
        </Btn>
      </div>

      {/* ── Editor content ────────────────────────── */}
      <EditorContent editor={editor} className="bg-white" />

      {/* ── Status bar ───────────────────────────── */}
      <StatusBar editor={editor} />
    </div>
  );
}
