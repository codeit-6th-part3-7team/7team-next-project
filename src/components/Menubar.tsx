import Image from "next/image";
import { Editor } from "@tiptap/react";
import { ActionIcon, Button, ColorPicker, Flex, Modal } from "@mantine/core";

import { useCallback, useState } from "react";
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
import FileInput from "./FileInput";

export default function MenuBar({ editor }: { editor: Editor }) {
  const [colorPickerOpened, { open: openColorPicker, close: closeColorPicker }] = useDisclosure(false);
  const [uploaderOpened, { open: openUploader, close: closeUploader }] = useDisclosure(false);
  const [fileUrl, setFileUrl] = useState<string>("");

  const [fileValue, setFileValue] = useState<File | null>(null);
  const [colorValue, handleColorChange] = useState("");
  const [colorClass, setColorClass] = useState("");

  const handleColoring = () => {
    setColorClass(editor.isActive("textStyle", { color: colorValue }) ? "is-active" : "");
    editor.chain().focus().setColor(colorValue).run();
  };

  const handleUploading = useCallback(() => {
    if (fileUrl) {
      editor.chain().focus().setImage({ src: fileUrl }).run();
    }
    setFileValue(null);
  }, [editor, fileUrl]);

  return (
    <div className="control-group sticky">
      <Flex gap={16} px={16} className="button-group">
        <Flex>
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
        </Flex>
        <Flex>
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
        </Flex>
        <Flex>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Settings"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
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
          <ActionIcon variant="transparent" size="lg" aria-label="Settings" onClick={openUploader}>
            <Image src={iconImage} alt="이미지" width={24} height={24} />
          </ActionIcon>
        </Flex>
      </Flex>
      <Modal centered opened={colorPickerOpened} size="xs" onClose={closeColorPicker} title="색상 선택기">
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
            className="self-end"
          >
            선택
          </Button>
        </Flex>
      </Modal>
      <Modal centered opened={uploaderOpened} size="xs" onClose={closeUploader} title="이미지 선택기">
        <Flex direction="column">
          <FileInput value={fileValue} onChange={setFileValue} setUrl={setFileUrl} />
          <Flex justify="flex-end">
            <Button
              type="submit"
              variant="outline"
              color="green"
              mt={20}
              px={40}
              onClick={() => {
                handleUploading();
                closeUploader();
              }}
            >
              선택
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </div>
  );
}
