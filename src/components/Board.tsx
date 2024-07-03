import Parser from "html-react-parser";
import Image from "next/image";
import { ActionIcon, Box, Button, Divider, Flex, Modal, useMatches } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import IcoPencil from "@/public/assets/ic_pencil.svg";
import IcoBin from "@/public/assets/ic_bin.svg";
import IcoHeart from "@/public/assets/ic_heart.svg";
import IcoHeartOn from "@/public/assets/ic_heart_on.svg";
import Link from "next/link";
import axios from "@/src/apis/axios";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";

export interface ArticleType {
  id: number;
  title: string;
  content: string;
  image: string;
  updatedAt: Date;
  writer: {
    id: number;
    name: string;
  };
  likeCount: number;
  isLiked: boolean;
}

interface BoardProps {
  initialValues: ArticleType | null;
  isMine: boolean;
}

export default function Board({ initialValues, isMine }: BoardProps) {
  const [values] = useState(initialValues);
  const [like, setLike] = useState(initialValues?.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(initialValues?.likeCount ?? 0);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const router = useRouter();
  const btnColor = useMatches({
    base: "transparent",
    sm: "#4CBFA4",
  });
  const btnSize = useMatches({
    base: "compact-xs",
    sm: "sm",
  });

  const handleHeart = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      await axios.post(`/articles/${values?.id}/like`);
      setLikeCount((prevValue) => prevValue + 1);
    } else {
      await axios.delete(`/articles/${values?.id}/like`);
      setLikeCount((prevValue) => prevValue - 1);
    }
    setLike(!like);
  };

  const handleDelete = async () => {
    await axios.delete(`/articles/${values?.id}`);
    router.push("/boards");
  };

  return (
    <>
      <Flex direction="column" justify="center" align="center" w={{ base: "100%", lg: 1060 }} px={{ base: 20, sm: 60, lg: 0 }}>
        <Flex direction="column" w="100%" pt={46} pb={30} px={30} className="rounded-[10px] bg-white drop-shadow-md">
          <Box mb={{ base: 14, sm: 30 }}>
            <Box className="float-left overflow-hidden">
              <h2 className="text-24 font-semibold text-gray-800 md:text-32">{values?.title}</h2>
            </Box>
            {isMine && (
              <Flex gap={{ base: 12, lg: 14 }} className="float-right">
                <Button href={`/boards/${values?.id}/edit`} component={Link} type="submit" color={btnColor} size={btnSize} className="mantine-visible-from-sm">
                  수정하기
                </Button>
                <ActionIcon variant="transparent" aria-label="수정하기" className="mantine-hidden-from-sm">
                  <Image src={IcoPencil} width={24} height={24} alt="아이콘" aria-hidden="true" />
                </ActionIcon>
                <Button type="submit" color={btnColor} size={btnSize} className="mantine-visible-from-sm" onClick={openDeleteModal}>
                  삭제하기
                </Button>
                <ActionIcon variant="transparent" aria-label="삭제하기" className="mantine-hidden-from-sm" onClick={openDeleteModal}>
                  <Image src={IcoBin} width={24} height={24} alt="아이콘" aria-hidden="true" />
                </ActionIcon>
              </Flex>
            )}
          </Box>
          <Flex justify="space-between">
            <p className="text-12 text-gray-400 md:text-14">
              <strong className="mr-2 font-normal">{values?.writer.name}</strong>
              <strong className="font-normal">{new Date(values?.updatedAt ?? "").toLocaleDateString()}</strong>
            </p>
            <label htmlFor="like" className="flex items-center gap-[2px]">
              <Flex w={{ base: 16, sm: 18 }} h={{ base: 16, sm: 18 }}>
                {like ? (
                  <Image src={IcoHeartOn} style={{ width: "100%" }} alt="아이콘" aria-hidden="true" className="mr-1" />
                ) : (
                  <Image src={IcoHeart} style={{ width: "100%" }} alt="아이콘" aria-hidden="true" className="mr-1" />
                )}
              </Flex>
              <span className="text-12 text-gray-400 md:text-14">{likeCount}</span>
            </label>
            <input type="checkbox" id="like" checked={like} onChange={handleHeart} className="hidden" />
          </Flex>
          <Divider color="#E4E5F0" mt={10} />
          <Flex direction="column" py={{ base: 16, sm: 20 }} className="text-gray-800">
            {Parser(values?.content ?? "")}
          </Flex>
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