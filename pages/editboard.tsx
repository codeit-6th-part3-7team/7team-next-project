import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";

export default function EditBoard() {
  return (
    <Flex direction="column">
      <WriteBoard type="edit" initialValues={{ title: "dd", content: "ss" }} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
