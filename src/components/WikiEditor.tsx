import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import EditorMenu from "./EditorMenu";

export default function WikiEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
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
    // todo initialValue prop으로 받아서 넣어주기
    content: `
    <h2>
      제목1
    </h2>
    <p>
      본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.
    </p>
    <br/>
    <h2>
      제목2
    </h2>
    <p>
      내용입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.본문입니다.
    </p>
    `,
  });

  return (
    <>
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
