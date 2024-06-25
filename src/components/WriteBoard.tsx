import Image from "next/image";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import UnderLine from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ActionIcon, Box, Button, ColorPicker, Flex, Input, Modal } from "@mantine/core";
import { useState } from "react";
import iconBold from "@/public/assets/ic_bold.svg";
import iconItalic from "@/public/assets/ic_italic.svg";
import iconUnderline from "@/public/assets/ic_underline.svg";
import iconCenter from "@/public/assets/ic_Alignment_center.svg";
import iconRight from "@/public/assets/ic_Alignment_right.svg";
import iconBulletList from "@/public/assets/ic_Bullet.svg";
import iconOrderedList from "@/public/assets/ic_numbering.svg";
import iconColoring from "@/public/assets/ic_coloring.svg";
import iconImage from "@/public/assets/ic_image.svg";
import iconLeft from "@/public/assets/ic_Alignment_left.svg";
import { useDisclosure } from "@mantine/hooks";

const extensions = [
  UnderLine,
  TextStyle,
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
  const [colorPickerOpened, { open: openColorPicker, close: closeColorPicker }] = useDisclosure(false);
  const [colorValue, handleColorChange] = useState("rgba(47, 119, 150, 0.7)");
  const [colorClass, setColorClass] = useState("");
  const handleColoring = () => {
    setColorClass(editor.isActive("textStyle", { color: colorValue }) ? "is-active" : "");
    editor.chain().focus().setColor(colorValue).run();
  };
  return (
    <div className="control-group">
      <div className="button-group">
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Image src={iconBold} alt="굵게" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Image src={iconItalic} alt="기울게" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <Image src={iconUnderline} alt="밑줄" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <Image src={iconLeft} alt="왼쪽 정렬" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        >
          <Image src={iconCenter} alt="가운데 정렬" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <Image src={iconRight} alt="오른쪽 정렬" width={24} height={24} />
        </ActionIcon>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
          <Image src={iconBulletList} alt="글머리 기호" width={24} height={24} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Settings"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <Image src={iconOrderedList} alt="글번호" width={24} height={24} />
        </ActionIcon>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings" onClick={openColorPicker} className={colorClass}>
          <Image src={iconColoring} alt="글자색" width={24} height={24} />
        </ActionIcon>
        <ActionIcon variant="transparent" size="lg" aria-label="Settings">
          <Image src={iconImage} alt="이미지" width={24} height={24} />
        </ActionIcon>
      </div>
      <Modal opened={colorPickerOpened} size="xs" onClose={closeColorPicker} title="Authentication">
        <Flex direction="column" align="center">
          <ColorPicker format="rgba" size="lg" value={colorValue} onChange={handleColorChange} />
          <Button
            type="submit"
            variant="outline"
            color="green"
            mt={20}
            px={40}
            onClick={() => {
              handleColoring();
              closeColorPicker();
            }}
          >
            선택
          </Button>
        </Flex>
      </Modal>
    </div>
  );
}

export default function WriteBoard() {
  const [length, setLength] = useState<number | undefined>(0);
  const [lengthExceptSpace, setLengthExceptSpace] = useState<number | undefined>(0);
  const editor = useEditor({
    extensions,
    onUpdate: () => {
      setLength(editor?.getText().length);
      setLengthExceptSpace(editor?.getText().replace(/ /g, "").length);
    },
  });

  if (!editor) {
    return null;
  }

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
            <EditorContent editor={editor} placeholder="본문을 입력해주세요." className="" />
            <MenuBar editor={editor} />
          </div>
        </Box>
        <Button color="green">등록하기</Button>
      </Box>
    </div>
  );
}
