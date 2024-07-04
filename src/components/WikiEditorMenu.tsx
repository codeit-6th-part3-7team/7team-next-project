import { Editor } from "@tiptap/react";
import Button from "./WikiEditorButton";

type EditorMenuProps = {
  editor: Editor;
  title: string;
};

export default function EditorMenu({ editor, title }: EditorMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="scrollbar-hide relative flex h-[60px] items-center justify-between overflow-y-hidden overflow-x-scroll rounded-[20px] bg-gray-100 px-5 py-[18px] shadow-lg shadow-gray-200">
      <span className="text-20 font-semibold">{title}</span>
      <div className="flex w-[1120px] items-center gap-5">
        {/* note 글자모양 */}
        <Button onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} iconName="bold" alt="글자굵게" />
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} iconName="italic" alt="글자기울임꼴" />
        <Button onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} iconName="underline" alt="글자취소선" />
        <div className="h-6 w-0 border-[1px] border-gray-200" />
        {/* note 계층 */}
        {/* todo 아이콘이 없어서 임시로 링크아이콘이나 텍스트로 다 넣어뒀습니다.. 추후에 율님 작업 머지하고 변경 하겠습니다 */}
        <Button onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} iconName="link" alt="본문" />
        <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} iconName="link" alt="인용구" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} iconName="link" alt="제목1" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} iconName="link" alt="제목2" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} iconName="link" alt="제목3" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} iconName="link" alt="제목4" />
        <div className="h-6 w-0 border-[1px] border-gray-200" />
        {/* note 단락 */}
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} iconName="bullet_list" alt="글머리기호" />
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} iconName="number_list" alt="글머리번호" />
        <Button onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} iconName="number_list" alt="일반정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} iconName="number_list" alt="왼쪽정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} iconName="number_list" alt="가운데정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} iconName="number_list" alt="오른쪽정렬" />
        {/* todo 아이콘 추가하고 컴포넌트로 변경 */}
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="flex h-6 w-6 items-center justify-center">
          -
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="flex h-6 w-6 items-center justify-center">
          Undo
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="flex h-6 w-6 items-center justify-center">
          Redo
        </button>
        <div className="h-6 w-0 border-[1px] border-gray-200" />
        {/* note 기타기능 */}
        <Button onClick={() => {}} active={false} iconName="picture" alt="이미지삽입" />
        <Button onClick={() => {}} active={false} iconName="video" alt="비디오삽입" />
        <Button onClick={() => {}} active={false} iconName="link" alt="링크삽입" />
      </div>
    </div>
  );
}
