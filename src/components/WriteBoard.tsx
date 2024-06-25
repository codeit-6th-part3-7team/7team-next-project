import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, Input } from "@mantine/core";
import { ChangeEvent, useState } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

function MenuBar({ editor }: { editor: Editor }) {
  return (
    <div className="control-group">
      <div className="button-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}>
          Left
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}>
          Center
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}>
          Right
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}>
          Justify
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
          Bullet list
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
          Ordered list
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
          Blockquote
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal rule
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          Undo
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          Redo
        </button>
        <button type="button" onClick={() => editor.chain().focus().setColor("#958DF1").run()} className={editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}>
          Purple
        </button>
      </div>
    </div>
  );
}

export default function WriteBoard() {
  const [length, setLength] = useState(0);
  const [lengthExceptSpace, setLengthExceptSpace] = useState(0);
  const editor = useEditor({
    extensions,
  });

  if (!editor) {
    return null;
  }

  const handleChange = (e: ChangeEvent<HTMLDivElement>) => {
    setLength(e.target.innerText.length);
    setLengthExceptSpace(e.target.innerText.replace(/ /g, "").length);
  };

  return (
    <div className="flex justify-center align-middle">
      <Box w={{ base: "100%", lg: 1060 }} pt={46} pb={30} px={30} mx={{ base: 0, sm: 60, lg: 0 }} mt={{ base: 0, sm: 54 }} className="bg-white drop-shadow-md">
        <h1>게시물 등록하기</h1>
        <p>
          <strong>이율</strong>
          <strong>2024.06.25.</strong>
        </p>
        <Input variant="unstyled" size="md" placeholder="제목을 입력해주세요." />
        <Box>
          <p>
            <span>공백포함 : 총 {length}자</span>
            <span aria-hidden="true"> | </span>
            <span>공백제외 : 총 {lengthExceptSpace}자</span>
          </p>
          <div>
            <EditorContent editor={editor} onChange={handleChange} placeholder="본문을 입력해주세요." />
            <MenuBar editor={editor} />
          </div>
        </Box>
        <Button color="green">등록하기</Button>
      </Box>
    </div>
  );
}
