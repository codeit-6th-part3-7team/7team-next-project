import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex } from "@mantine/core";
import axios from "@/src/apis/axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AddBoard() {
  const router = useRouter();

  const handleSubmit = async (values: { title: string; content: string; image: null }) => {
    await axios.post("/articles", values);
    router.push("/boards");
  };

  return (
    <Flex direction="column">
      <WriteBoard onSubmit={handleSubmit} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
