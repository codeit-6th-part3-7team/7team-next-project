import { ActionIcon, Flex } from "@mantine/core";
import Image from "next/image";
import ImgUser from "@/public/assets/user.svg";
import IcoPencil from "@/public/assets/ic_pencil.svg";
import IcoBin from "@/public/assets/ic_bin.svg";

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

export default function Reply({ reply }: { reply: ReplyType }) {
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
            <ActionIcon variant="transparent" aria-label="삭제하기">
              <Image src={IcoBin} width={24} height={24} alt="아이콘" aria-hidden="true" />
            </ActionIcon>
          </Flex>
        </Flex>
        <p className="text-gray-800">{reply?.content}</p>
        <span className="mt-[4px] text-gray-400">{new Date(reply?.updatedAt).toLocaleDateString()}</span>
      </Flex>
    </Flex>
  );
}
