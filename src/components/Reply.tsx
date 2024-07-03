import { ActionIcon, Button, Flex, Modal, Textarea } from "@mantine/core";
import Image from "next/image";
import ImgUser from "@/public/assets/user.svg";
import IcoPencil from "@/public/assets/ic_pencil.svg";
import IcoBin from "@/public/assets/ic_bin.svg";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import instance from "../apis/axios";

export interface ReplyType {
  writer: {
    image: string;
    name: string;
    id: number;
  };
  updatedAt: Date;
  content: string;
  id: number;
}

export default function Reply({ reply, onUpdate }: { reply: ReplyType; onUpdate: () => void }) {
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [onEdit, setOnEdit] = useState(false);
  const [replyContent, setReplyContent] = useState(reply?.content);

  const handleDelete = async () => {
    await instance.delete(`/comments/${reply.id}`);
    onUpdate();
    closeDeleteModal();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await instance.patch(`/comments/${reply.id}`, { content: replyContent });
    setReplyContent("");
    onUpdate();
  };

  return (
    <>
      <Flex w="100%" gap={{ base: 15, sm: 20 }} px={{ base: 20, sm: 30 }} py={{ base: 16, sm: 22 }} className="rounded-[10px] bg-white drop-shadow-md">
        <Flex align="flex-start">
          <Flex w={{ base: 40, sm: 50 }} h={{ base: 40, sm: 50 }}>
            <Image
              src={ImgUser}
              overrideSrc={reply?.writer?.image}
              style={{
                width: "100%",
              }}
              alt="유저 프로필"
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap={{ base: 0, sm: 6 }} className="flex-shrink flex-grow">
          <Flex justify="space-between">
            <strong className="text-16 text-gray-800 md:text-18">{reply?.writer?.name}</strong>
            <Flex gap={{ base: 15, sm: 20 }}>
              <ActionIcon variant="transparent" aria-label="수정하기">
                <Image
                  src={IcoPencil}
                  width={24}
                  height={24}
                  alt="아이콘"
                  aria-hidden="true"
                  onClick={() => {
                    setOnEdit(!onEdit);
                  }}
                />
              </ActionIcon>
              <ActionIcon variant="transparent" aria-label="삭제하기" onClick={openDeleteModal}>
                <Image src={IcoBin} width={24} height={24} alt="아이콘" aria-hidden="true" />
              </ActionIcon>
            </Flex>
          </Flex>
          {onEdit ? (
            <form onSubmit={handleSubmit} className="w-full">
              <Flex className="relative">
                <Textarea
                  name="content"
                  variant="unstyled"
                  size="md"
                  mih={133}
                  py={13}
                  px={15}
                  value={replyContent}
                  maxLength={500}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="댓글을 입력해주세요."
                  className="w-full rounded-[10px] bg-gray-50"
                  styles={() => ({ input: { "--input-placeholder-color": "#8F95B2" } })}
                />
                <Flex justify="space-between" align="flex-end" className="absolute bottom-0 w-full px-[15px] py-[13px]">
                  <p className="text-14 text-gray-300">{replyContent.length} / 500</p>
                  <Button type="submit" color="green" disabled={!replyContent.length}>
                    댓글 등록
                  </Button>
                </Flex>
              </Flex>
            </form>
          ) : (
            <p className="text-14 text-gray-800 md:text-16">{reply?.content}</p>
          )}
          <span className="mt-[4px] text-12 text-gray-400 md:text-14">{new Date(reply?.updatedAt).toLocaleDateString()}</span>
        </Flex>
      </Flex>
      <Modal opened={deleteModalOpened} onClose={closeDeleteModal} size="xs" centered>
        <Flex direction="column" align="center" gap={40}>
          <p>정말 삭제하시겠습니까?</p>
          <Flex gap={10}>
            <Button type="submit" color="green" onClick={handleDelete}>
              삭제하기
            </Button>
            <Button variant="outline" color="green" onClick={closeDeleteModal}>
              취소하기
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
