import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex } from "@mantine/core";
<<<<<<< HEAD
import axios from "@/src/apis/axios";
import Link from "next/link";
import { useRouter } from "next/router";

// TODO writer 추후 수정해야함
const INITIAL_VALUES = {
  title: "",
  content: "",
  writer: "이율",
  updatedAt: new Date(),
};

export default function AddBoard() {
  const router = useRouter();

  const handleSubmit = async (values: { title: string; content: string; image?: string }) => {
    await axios.post("/articles", values);
    router.push("/boards");
  };

  return (
    <Flex direction="column">
      <WriteBoard type="create" initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />
=======
import Link from "next/link";

export default function AddBoard() {
  return (
    <Flex direction="column">
      <WriteBoard />
>>>>>>> 36253ce (feat: 자유게시판 편집/작성 분리, WriteBoard 컴포넌트 prop 추가)
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
