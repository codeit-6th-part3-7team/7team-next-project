import { Button, Flex, Textarea } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import instance from "../apis/axios";

export default function WriteReply({ onUpdate }: { onUpdate: () => void }) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await instance.post(`/articles/${id}/comments`, { content });
    setContent("");
    onUpdate();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Flex className="relative">
        <Textarea
          name="content"
          variant="unstyled"
          size="md"
          mih={133}
          py={13}
          px={15}
          value={content}
          maxLength={500}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="w-full rounded-[10px] bg-gray-50"
          styles={() => ({ input: { "--input-placeholder-color": "#8F95B2" } })}
        />
        <Flex justify="space-between" align="flex-end" className="absolute bottom-0 w-full px-[15px] py-[13px]">
          <p className="text-14 text-gray-300">{content.length} / 500</p>
          <Button type="submit" color="green" disabled={!content.length}>
            댓글 등록
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
