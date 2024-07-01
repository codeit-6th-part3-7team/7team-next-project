import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function WikiEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    // todo initialValue prop으로 받아서 넣어주기
    content: "<h1>초기 데이터 넣을곳</h1>",
  });

  return <EditorContent editor={editor} />;
}
