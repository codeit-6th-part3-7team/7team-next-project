import Link from "next/link";
import { useRouter } from "next/router";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>
        <Link href={`/boards/${id}/edit`}>수정하기</Link>
      </div>
      <div />
    </>
  );
}
