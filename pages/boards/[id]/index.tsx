import Link from "next/link";
import axios from "@/src/apis/axios";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let article: ArticleType | null = null;
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

interface ArticleType {
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
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>
        {article.title}
        <Link href={`/boards/${id}/edit`}>수정하기</Link>
      </div>
      <div />
    </>
  );
}
