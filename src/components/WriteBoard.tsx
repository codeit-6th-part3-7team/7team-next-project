import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import UnderLine from "@tiptap/extension-underline";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, Divider, Flex, Input, useMatches } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import MenuBar from "./Menubar";

export default function WriteBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | undefined>({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [length, setLength] = useState<number | undefined>(0);
  const [lengthExceptSpace, setLengthExceptSpace] = useState<number | undefined>(0);
  const inputSize = useMatches({
    base: "md",
    sm: "xl",
  });

  const editor = useEditor({
    extensions: [
      Image,
      UnderLine,
      TextStyle,
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "본문을 입력해주세요.",
      }),
    ],
    onUpdate: () => {
      setLength(editor?.getText().length);
      setLengthExceptSpace(editor?.getText().replace(/ /g, "").length);
      setSubmitDisabled(!(editor?.getText() !== "" && title.length !== 0));
      setContent(editor?.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSubmitDisabled(!(editor?.getText() !== "" && e.target.value.length !== 0));
  };

  const handleSubmit = () => {
    // TODO : 게시글 등록하기
    // eslint-disable-next-line no-console
    console.log(title, content);
  };

  return (
    <div className="flex justify-center align-middle">
      <Flex
        direction="column"
        w={{ base: "100%", lg: 1060 }}
        mih={{ base: "calc(100vh - 80px)", sm: "calc(89vh - 80px)" }}
        pt={46}
        pb={30}
        px={30}
        mx={{ base: 0, sm: 60, lg: 0 }}
        my={{ base: 0, sm: "5.5vh" }}
        className="bg-white md:drop-shadow-md"
      >
        <h2 className="order-1 text-16 font-semibold text-gray-800 md:text-20 lg:text-24">게시물 등록하기</h2>
        <Box my={24} className="order-3">
          <p className="text-12 text-gray-400 md:text-16">
            <strong className="mr-2 font-normal">이율</strong>
            <strong className="font-normal">2024.06.25.</strong>
          </p>
        </Box>
        <Divider color="#E4E5F0" className="order-4" />
        <Flex align="center" className="order-5">
          <Input
            variant="unstyled"
            size={inputSize}
            value={title}
            maxLength={30}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요."
            className="flex-shrink flex-grow text-16 placeholder-gray-400 md:text-20"
          />
          <Flex className="flex-shrink-0 flex-grow-0">
            <span>{title.length}</span>
            <span>/</span>
            <span className="text-green-600">30</span>
          </Flex>
        </Flex>
        <Divider color="#E4E5F0" className="order-6" />
        <Flex direction="column" py={{ base: 16, sm: 20 }} flex="auto" className="order-7">
          <p className="flex-shrink-0 flex-grow-0 text-gray-900">
            <span>공백포함 : 총 {length}자</span>
            <span aria-hidden="true"> | </span>
            <span>공백제외 : 총 {lengthExceptSpace}자</span>
          </p>
          <Flex direction="column" pt={{ base: 16, sm: 20 }} className="flex-shrink flex-grow">
            <Flex className="flex-shrink flex-grow">
              <EditorContent editor={editor} placeholder="본문을 입력해주세요." className="w-full" />
            </Flex>
            <Flex bg="white" justify={{ base: "center", sm: "flex-start" }} className="sticky bottom-8 flex-shrink-0 flex-grow-0 rounded-full border">
              <MenuBar editor={editor} />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="order-2 self-end">
          <Button type="submit" color="green" mt={-31} disabled={submitDisabled} onSubmit={handleSubmit}>
            등록하기
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
