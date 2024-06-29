import { GetServerSidePropsContext } from "next";
import axios from "@/src/apis/axios";
import Board from "@/src/components/Board";
import { useState } from "react";

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

export interface ArticleType {
  title: string;
  content: string;
  image: string;
  updatedAt: Date;
  writer: {
    id: number;
    name: string;
  };
}

export default function ArticlePage({ article }: { article: ArticleType }) {
  return (
    <>
      <div>
        <Board initialValues={article} />
      </div>
      <div />
    </>
  );
}
