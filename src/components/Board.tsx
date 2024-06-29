import { Box, Button, Divider, Flex } from "@mantine/core";
import { useState } from "react";

export const WriteBoardType = {
  Create: "create",
  Edit: "edit",
};

type ValueType = {
  title: string;
  content: string;
  writer: string;
  updatedAt: Date | string;
};

export default function Board({ initialValues }: ValueType) {
  const [values] = useState({
    title: initialValues.title,
    content: initialValues.content,
    writer: initialValues.writer,
    updatedAt: initialValues.updatedAt,
  });

  return (
    <div className="flex justify-center align-middle">
      <Flex
        direction="column"
        w={{ base: "100%", lg: 1060 }}
        mih={{ base: "calc(100vh - 130px)", sm: "calc(89vh - 130px)" }}
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
            <strong className="mr-2 font-normal">{values.writer}</strong>
            <strong className="font-normal">{values.updatedAt instanceof Date ? values.updatedAt.toLocaleDateString() : new Date(values.updatedAt).toLocaleDateString()}</strong>
          </p>
        </Box>
        <Divider color="#E4E5F0" className="order-4" />
        <Flex align="center" className="order-5">
          <Flex>{values.title}</Flex>
          <Flex className="flex-shrink-0 flex-grow-0">
            <span>{values.title.length}</span>
            <span>/</span>
            <span className="text-green-600">30</span>
          </Flex>
        </Flex>
        <Divider color="#E4E5F0" className="order-6" />
        <Flex direction="column" py={{ base: 16, sm: 20 }} flex="auto" className="order-7">
          <Flex direction="column" pt={{ base: 16, sm: 20 }} className="flex-shrink flex-grow">
            {values.content}
          </Flex>
        </Flex>
        <Flex className="order-2 self-end">
          <Button type="submit" color="green" mt={-31}>
            수정하기
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
