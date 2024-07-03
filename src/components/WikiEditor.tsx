import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import WikiEditorMenu from "./WikiEditorMenu";

type WikiEditorProps = {
  initialData: string;
  handleChangeContent: (value: string) => void;
};

export default function WikiEditor({ initialData, handleChangeContent }: WikiEditorProps) {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    content: `${initialData || "<h1>제목</h1><p>본문</p>"}`,
    onUpdate: () => {
      handleChangeContent(editor?.getHTML() || "");
    },
  });

  return (
    <>
      {editor && <WikiEditorMenu editor={editor} />}
      {/* note prettier 설정에서 강제 정렬 수정으로 오류 발생해서 해당 부분 제외 했습니다 */}
      {/* eslint-disable-next-line */}
      <div className="prose prose-sm md:prose-base max-w-none rounded-[10px] p-3 shadow-lg shadow-gray-200">
        <EditorContent editor={editor} className="w-full" />
      </div>
    </>
  );
}
