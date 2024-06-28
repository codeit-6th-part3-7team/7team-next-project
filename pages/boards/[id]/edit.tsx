import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex } from "@mantine/core";
import axios from "@/src/apis/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article;
  let writer;
  try {
    const articleRes = await axios.get(`/articles/${id}`);
    article = articleRes.data ?? [];
    writer = articleRes.data.writer ?? [];
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
      article,
      writer,
    },
  };
}

interface ArticleType {
  title: string;
  content: string;
  image: string;
  updatedAt: Date;
}
interface WriterType {
  id: number;
  name: string;
}

export default function EditBoard({ id, article, writer }: { id: number; article: ArticleType; writer: WriterType }) {
  const [value] = useState({
    title: article.title,
    content: article.content,
    image: article.image,
    writer: writer.name,
    updatedAt: article.updatedAt,
  });
  const router = useRouter();

  const handleSubmit = async (values: { title: string; content: string; image?: string }) => {
    await axios.patch(`/articles/${id}`, values);
    router.push(`/boards/${id}`);
  };

  return (
    <Flex direction="column">
      <WriteBoard type="edit" initialValues={value} onSubmit={handleSubmit} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}