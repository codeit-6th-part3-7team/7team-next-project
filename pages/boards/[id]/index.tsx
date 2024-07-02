import { useRouter } from "next/router";
import instance from "@/src/apis/axios";
import Board, { ArticleType } from "@/src/components/Board";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [Article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (id !== undefined) {
        const response = await instance.get(`/articles/${id}`);
        setArticle(response.data);
      }
    } catch (e) {
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleLoad();
  }, [id, handleLoad]);

  if (loading) {
    return (
      <Flex justify="center" align="center" mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}>
        <Loader size="md" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" justify="center" align="center" mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}>
        <p className="text-red-200">{error}</p>
        <Button href="/boards" component={Link} variant="outline" color="green" mt={4}>
          목록으로
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <Board initialValues={Article} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
