import { useRouter } from "next/router";
import instance from "@/src/apis/axios";
import Board, { ArticleType } from "@/src/components/Board";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import WriteReply from "@/src/components/WriteReply";
import Reply, { ReplyType } from "@/src/components/Reply";
import { useInView } from "react-intersection-observer";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<ArticleType>({
    id: 0,
    title: "",
    content: "",
    image: "",
    updatedAt: new Date(),
    writer: {
      id: 0,
      name: "",
    },
    likeCount: 0,
    isLiked: false,
  });
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [replyLoading, setReplyLoading] = useState<boolean>(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 50%가 보일 때 감지
  });

  const handleLoad = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!id) {
        return;
      }
      const response = await instance.get(`/articles/${id}`);
      const userResponse = await instance.get(`/users/me`);

      setArticle(response.data);
      setUserId(userResponse.data.id);
    } catch (e) {
      if (!userId) {
        setError("로그인이 필요합니다.");
      } else {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [id, userId]);

  const handleLoadReplies = useCallback(
    async (nextCursor: number) => {
      if (nextCursor === null) return;

      setReplyLoading(true);
      setReplyError(null);
      try {
        if (!id) {
          return;
        }
        const replyResponse = await instance.get(`/articles/${id}/comments`, {
          params: {
            limit: 5, // 페이지당 댓글 개수 설정
            cursor: nextCursor, // 현재 커서 값 설정
          },
        });

        if (replyResponse.data.list.length !== 0 && cursor !== null) {
          setReplies((prevReplies) => [...prevReplies, ...replyResponse.data.list]);
          setCursor(replyResponse.data.nextCursor);
        }
      } catch (e) {
        setReplyError("댓글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setReplyLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    handleLoad();
  }, [id, handleLoad]);

  useEffect(() => {
    handleLoadReplies(0);
  }, [id, handleLoadReplies]);

  useEffect(() => {
    if (inView) {
      handleLoadReplies(cursor);
    }
  }, [inView]);

  if (loading) {
    // 초기 로딩 상태
    return (
      <Flex justify="center" align="center" mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}>
        <Loader size="md" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" justify="center" align="center" mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}>
        <p className="text-gray-600">{error}</p>
        <Button href="/boards" component={Link} variant="outline" w={140} h={{ base: 40, sm: 45 }} color="#4CBFA4" mt={4}>
          목록으로
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" my={{ base: 20, sm: 40, lg: 60 }}>
      <Board initialValues={article} isMine={(article?.writer.id ?? false) === userId} />
      <Flex justify="center" my={{ base: 40, lg: 60 }}>
        <Button href="/boards" component={Link} variant="outline" w={140} h={{ base: 40, sm: 45 }} color="#4CBFA4" px={40}>
          목록으로
        </Button>
      </Flex>
      <Flex direction="column" w={{ base: "100%", lg: 1060 }} px={{ base: 20, sm: 60, lg: 0 }}>
        <Flex gap={5} className="font-semibold" mb={{ base: 8, sm: 14 }}>
          <span className="text-gray-800">댓글</span>
          <span className="text-green-200">{replies?.length}</span>
        </Flex>
        <Flex>
          <WriteReply type="submit" replyId={0} initialValue="" onUpdate={handleLoad} />
        </Flex>
        <Flex direction="column" gap={{ base: 14, sm: 16, lg: 24 }} mt={{ base: 24, lg: 42 }}>
          {replies?.map((reply) => <Reply reply={reply} key={reply.id} isMine={(reply?.writer.id ?? false) === userId} onUpdate={handleLoad} />)}
        </Flex>
        <div ref={ref} className="flex justify-center py-[30px]">
          {replyLoading && <Loader size="md" />}
        </div>
      </Flex>
    </Flex>
  );
}
