import Image from "next/image";
import { Editor } from "@tiptap/react";
import { ActionIcon, Button, ColorPicker, Flex, Modal, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import axios from "@/src/apis/axios";
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
import iconLink from "@/public/assets/ic_link.svg";
import { useDisclosure } from "@mantine/hooks";
import FileInput from "./FileInput";

export default function MenuBar({ editor, setTitleImage }: { editor: Editor; setTitleImage: (arg0: string) => void }) {
  const [colorPickerOpened, { open: openColorPicker, close: closeColorPicker }] = useDisclosure(false);
  const [uploaderOpened, { open: openUploader, close: closeUploader }] = useDisclosure(false);
  const [anchorOpened, { open: openAnchor, close: closeAnchor }] = useDisclosure(false);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [colorValue, handleColorChange] = useState("");
  const [colorClass, setColorClass] = useState("");
  const [linkValue, setLinkValue] = useState("");

  const handleColoring = () => {
    setColorClass(editor.isActive("textStyle", { color: colorValue }) ? "is-active" : "");
    editor.chain().focus().setColor(colorValue).run();
  };

  const handleUploading = useCallback(async () => {
    if (fileValue) {
      const formData = new FormData();
      formData.append("image", fileValue);

      const res = await axios.post("/images/upload", formData);
      const { url } = res.data;

      editor.chain().focus().setImage({ src: url }).run();
      editor.commands.createParagraphNear();

      setTitleImage(url);
      setFileValue(null);
    }
  }, [editor, fileValue, setTitleImage]);

  const handleAnchoring = useCallback(() => {
    if (linkValue === null) {
      return;
    }

    if (linkValue === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: linkValue, target: "_blank" }).run();
    setLinkValue("");
  }, [editor, linkValue]);

  return (
    <Flex py={10} className="control-group sticky basis-full">
      <Flex justify="space-between" px={16} className="button-group basis-full">
        <Flex gap={{ base: 0, sm: 16 }}>
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
        <Flex>
          <ActionIcon variant="transparent" size="lg" bg="#E2E8F0" style={{ borderRadius: "50%" }} aria-label="Settings" onClick={openAnchor} className={editor.isActive("link") ? "is-active" : ""}>
            <Image src={iconLink} alt="링크" width={24} height={24} />
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
      <Modal
        centered
        opened={uploaderOpened}
        size="xs"
        onClose={() => {
          closeUploader();
        }}
        title="이미지 선택기"
      >
        <Flex direction="column">
          <FileInput value={fileValue} onChange={setFileValue} />
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
      <Modal centered opened={anchorOpened} size="xs" onClose={closeAnchor} title="링크 만들기">
        <Flex direction="column" align="center">
          <TextInput
            variant="unstyled"
            radius="md"
            size="lg"
            px={20}
            value={linkValue}
            onChange={(event) => setLinkValue(event.currentTarget.value)}
            placeholder="링크할 URL을 입력해주세요."
            className="w-full rounded-[10px] bg-gray-100"
          />
          <Button
            type="submit"
            variant="outline"
            color="green"
            mt={20}
            px={40}
            onClick={() => {
              handleAnchoring();
              closeAnchor();
            }}
            className="self-end"
          >
            만들기
          </Button>
        </Flex>
      </Modal>
    </Flex>
  );
}
