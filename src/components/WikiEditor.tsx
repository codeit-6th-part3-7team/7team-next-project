import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function WikiEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
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
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
