import Link from "next/link";
import { useRouter } from "next/router";

export default function ArticlePage({ article, writer }: { article: ArticleType; writer: WriterType }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>
        {article}
        {writer}
        <Link href={`/boards/${id}/edit`}>수정하기</Link>
      </div>
      <div />
    </>
  );
}
