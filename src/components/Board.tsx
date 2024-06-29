import Parser from "html-react-parser";
import { Box, Button, Flex } from "@mantine/core";
import { useState } from "react";

interface BoardProps {
  initialValues: ArticleType;
}

export default function Board({ initialValues }: BoardProps) {
  const [values] = useState(initialValues);

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
        <h2 className="order-1 text-16 font-semibold text-gray-800 md:text-20 lg:text-24">{values.title}</h2>
        <Box my={24} className="order-3">
          <p className="text-12 text-gray-400 md:text-16">
            <strong className="mr-2 font-normal">{values.writer.name}</strong>
            <strong className="font-normal">{values.updatedAt instanceof Date ? values.updatedAt.toLocaleDateString() : new Date(values.updatedAt).toLocaleDateString()}</strong>
          </p>
        </Box>
        <Flex direction="column" py={{ base: 16, sm: 20 }} flex="auto" className="order-7">
          <Flex direction="column" pt={{ base: 16, sm: 20 }} className="flex-shrink flex-grow">
            {Parser(values.content)}
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
