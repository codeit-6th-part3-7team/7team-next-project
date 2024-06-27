"use client";

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
  try {
    const articleRes = await axios.get(`/articles/${String(id)}`);
    article = articleRes.data ?? [];
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      article,
    },
  };
}

export default function EditBoard({ article }: { article: any }) {
  const [value, setValue] = useState({
    title: article.title,
    content: article.content,
  });
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (values: { title: string; content: string; image: null }) => {
    await axios.patch(`/articles/${id}`, values);
    router.push("/boards");
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
