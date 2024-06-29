import { GetServerSidePropsContext } from "next";
import axios from "@/src/apis/axios";
import Board, { ArticleType } from "@/src/components/Board";
import Header from "@/src/components/Header";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article: ArticleType | null = null;
  try {
    const articleRes = await axios.get(`/articles/${String(id)}`);
    article = articleRes.data ?? [];
  } catch {}
  return {
    props: {
      article,
    },
  };
}

export default function ArticlePage({ article }: { article: ArticleType }) {
  return (
    <>
      <Header />
      <Flex direction="column">
        <Board initialValues={article} />
        <Flex justify="center" h={50}>
          <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
            목록으로
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
