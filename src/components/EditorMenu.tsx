import { Editor } from "@tiptap/react";
import Image from "next/image";
import ic_bold from "@/public/icons/ic_bold.svg";
import ic_bullet_list from "@/public/icons/ic_bullet_list.svg";
import ic_italic from "@/public/icons/ic_italic.svg";
import ic_number_list from "@/public/icons/ic_number_list.svg";
import ic_picture from "@/public/icons/ic_picture.svg";
import ic_underline from "@/public/icons/ic_underline.svg";
import ic_video from "@/public/icons/ic_video.svg";
import ic_link from "@/public/icons/ic_link.svg";

type ButtonProps = {
  onClick: () => void;
  active: boolean;
  iconName: keyof typeof icons;
  alt: string;
};

const icons = {
  bold: ic_bold,
  bullet_list: ic_bullet_list,
  italic: ic_italic,
  number_list: ic_number_list,
  picture: ic_picture,
  underline: ic_underline,
  video: ic_video,
  link: ic_link,
};

const Button = function ({ onClick, active, iconName, alt }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`flex h-6 w-6 items-center justify-center ${active ? "is-active" : ""}`}>
      <Image className="h-6 w-6" src={icons[iconName]} alt={alt} width={24} height={24} />
    </button>
  );
};

type EditorMenuProps = {
  editor: Editor;
};

export default function EditorMenu({ editor }: EditorMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="scrollbar-hide relative h-[60px] overflow-y-hidden overflow-x-scroll rounded-[20px] bg-gray-50 px-5 py-[18px]">
      <div className="flex w-[1000px] items-center gap-5">
        {/* note 글자모양 */}
        <Button onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} iconName="bold" alt="글자굵게" />
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} iconName="italic" alt="글자기울임꼴" />
        <Button onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} iconName="underline" alt="글자취소선" />
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} className="flex h-6 w-6 items-center justify-center">
          Clear marks
        </button>
        {/* note 계층 */}
        {/* todo 아이콘이 없어서 임시로 링크아이콘이나 텍스트로 다 넣어뒀습니다.. 추후에 율님 작업 머지하고 변경 하겠습니다 */}
        <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} iconName="link" alt="인용구" />
        <Button onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} iconName="link" alt="본문" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} iconName="link" alt="제목1" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} iconName="link" alt="제목2" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} iconName="link" alt="제목3" />
        <Button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} iconName="link" alt="제목4" />
        <button type="button" onClick={() => editor.chain().focus().clearNodes().run()} className="flex h-6 w-6 items-center justify-center">
          계층해제
        </button>
        {/* note 단락 */}
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} iconName="bullet_list" alt="글머리기호" />
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} iconName="number_list" alt="글머리번호" />
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="flex h-6 w-6 items-center justify-center">
          구분선 삽입
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="flex h-6 w-6 items-center justify-center">
          Undo
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="flex h-6 w-6 items-center justify-center">
          Redo
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} className="flex h-6 w-6 items-center justify-center">
          Clear marks
        </button>
        {/* note 기타기능 */}
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <Image src={ic_picture} alt="이미지삽입" width={24} height={24} />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <Image src={ic_video} alt="비디오삽입" width={24} height={24} />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <Image src={ic_link} alt="링크삽입" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
