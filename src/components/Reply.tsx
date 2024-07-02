import { ActionIcon, Button, Flex, Modal } from "@mantine/core";
import Image from "next/image";
import ImgUser from "@/public/assets/user.svg";
import IcoPencil from "@/public/assets/ic_pencil.svg";
import IcoBin from "@/public/assets/ic_bin.svg";
import { useDisclosure } from "@mantine/hooks";
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

  const handleDelete = async () => {
    await instance.delete(`/comments/${reply.id}`);
    onUpdate();
    closeDeleteModal();
  };

  return (
    <Flex w="100%" gap={{ base: 15, sm: 20 }} px={{ base: 20, sm: 30 }} py={{ base: 16, sm: 22 }} className="rounded-[10px] bg-white drop-shadow-md">
      <Flex align="flex-start">
        <Image src={ImgUser} overrideSrc={reply?.writer?.image} width={50} height={50} alt="유저 프로필" />
      </Flex>
      <Flex direction="column" gap={{ base: 0, sm: 6 }} className="flex-shrink flex-grow">
        <Flex justify="space-between">
          <strong className="text-gray-800">{reply?.writer?.name}</strong>
          <Flex gap={{ base: 15, sm: 20 }}>
            <ActionIcon variant="transparent" aria-label="수정하기">
              <Image src={IcoPencil} width={24} height={24} alt="아이콘" aria-hidden="true" />
            </ActionIcon>
            <ActionIcon variant="transparent" aria-label="삭제하기" onClick={openDeleteModal}>
              <Image src={IcoBin} width={24} height={24} alt="아이콘" aria-hidden="true" />
            </ActionIcon>
          </Flex>
        </Flex>
        <p className="text-gray-800">{reply?.content}</p>
        <span className="mt-[4px] text-gray-400">{new Date(reply?.updatedAt).toLocaleDateString()}</span>
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
    </Flex>
  );
}
