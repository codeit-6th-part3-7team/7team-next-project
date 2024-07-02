import { Editor } from "@tiptap/react";
// import ic_align from "@/public/ic_align_left.webp";
// import ic_arrow from "@/public/ic_arrow.webp";
import ic_bold from "@/public/ic_bold.webp";
import ic_bullet from "@/public/ic_bullet_dot.webp";
import ic_italic from "@/public/ic_italic.webp";
import ic_numbering from "@/public/ic_numbering.webp";
import ic_picture from "@/public/ic_picture.webp";
import ic_underline from "@/public/ic_underline.webp";
import ic_video from "@/public/ic_video.webp";
import Image from "next/image";
import ic_link from "@/public/ic_copy_link.svg";

type EditorMenuProps = {
  editor: Editor;
};

export default function EditorMenu({ editor }: EditorMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-[60px] gap-5 rounded-[20px] bg-gray-50 px-5 py-[18px]">
      {/* note 글자모양 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Image src={ic_bold} alt="글자굵게" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Image src={ic_italic} alt="글자기울임꼴" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Image src={ic_underline} alt="글자밑줄" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear marks
      </button>
      {/* note 계층 */}
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
        인용구
      </button>
      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive("paragraph") ? "is-active" : ""}>
        본문
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
        제목1
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
        제목2
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
        제목3
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}>
        제목4
      </button>
      <button type="button" onClick={() => editor.chain().focus().clearNodes().run()}>
        계층해제
      </button>

      {/* note 단락 */}
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
        <Image src={ic_bullet} alt="글머리기호" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
        <Image src={ic_numbering} alt="글머리번호" />
      </button>

      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        구분선 삽입
      </button>
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        Undo
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        Redo
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        Clear marks
      </button>
      {/* todo 기타 기능버튼 */}
      <button type="button">
        <Image src={ic_picture} alt="이미지삽입" />
      </button>
      <button type="button">
        <Image src={ic_video} alt="비디오삽입" />
      </button>
      <button type="button">
        <Image src={ic_link} alt="링크삽입" />
      </button>
    </div>
  );
}
