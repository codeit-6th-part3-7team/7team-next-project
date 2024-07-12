import { useRouter } from "next/router";
import Board from "@/src/components/Board";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useMemo } from "react";
import WriteReply from "@/src/components/WriteReply";
import Reply from "@/src/components/Reply";
import useArticle from "@/src/hooks/useArticleQuery";
import { useGetMe } from "@/src/hooks/useUserQuery";
import { useArticleCommentList } from "@/src/hooks/useCommentQuery";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  const { data: article, isLoading: isArticleLoading } = useArticle(articleId);
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const { data: comments, isLoading: isArticleCommentListLoading } = useArticleCommentList({ articleId, limit: 100 });

  const isLoading = useMemo(() => isArticleLoading || isUserLoading || isArticleCommentListLoading, [isArticleLoading, isUserLoading, isArticleCommentListLoading]);

  const articleWithoutCreatedAt = useMemo(() => {
    if (article) {
      const { createdAt, ...rest } = article;
      return rest;
    }
    return undefined;
  }, [article]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}>
        <Loader size="md" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" my={{ base: 20, sm: 40, lg: 60 }}>
      {articleWithoutCreatedAt && <Board initialValues={articleWithoutCreatedAt} isMine={(article?.writer.id ?? false) === user?.id} />}
      <Flex justify="center" my={{ base: 40, lg: 60 }}>
        <Button href="/boards" component={Link} variant="outline" w={140} h={{ base: 40, sm: 45 }} color="#4CBFA4" px={40}>
          목록으로
        </Button>
      </Flex>
      <Flex direction="column" w={{ base: "100%", lg: 1060 }} px={{ base: 20, sm: 60, lg: 0 }}>
        <Flex gap={5} className="font-semibold" mb={{ base: 8, sm: 14 }}>
          <span className="text-gray-800">댓글</span>
          <span className="text-green-200">{comments?.list.length}</span>
        </Flex>
        <Flex>
          <WriteReply type="submit" replyId={0} initialValue="" />
        </Flex>
        <Flex direction="column" gap={{ base: 14, sm: 16, lg: 24 }} mt={{ base: 24, lg: 42 }}>
          {comments?.list.map((reply) => <Reply reply={reply} key={reply.id} isMine={(reply?.writer.id ?? false) === user?.id} articleId={articleId} />)}
        </Flex>
      </Flex>
    </Flex>
  );
}
