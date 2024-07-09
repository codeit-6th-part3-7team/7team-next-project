import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "@/src/apis/axios";

export default function EditBoard() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    writer: "",
    updatedAt: new Date(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const handleLoad = async () => {
    setLoading(true);
    try {
      const userRes = await instance.get(`/users/me`);
      const articleRes = await instance.get(`/articles/${id}`);
      const { title, content, image, writer, updatedAt } = articleRes.data;
      if (userRes.data.id === articleRes.data.writer.id) {
        setValues({ title, content, image, writer: writer.name, updatedAt });
      } else {
        router.push(`/boards/${id}`);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("알 수 없는 에러가 발생했습니다."));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { title: string; content: string; image?: string }) => {
    if (!id) {
      return;
    }

    setLoading(true);
    try {
      await instance.patch(`/articles/${id}`, data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("알 수 없는 에러가 발생했습니다."));
      }
    } finally {
      setLoading(false);
      router.push(`/boards/${id}`);
    }
  };

  useEffect(() => {
    if (id) {
      handleLoad();
    }
  }, [id]);

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
        <p className="text-gray-600">{error?.message}</p>
        <Button href="/boards" component={Link} w={140} variant="outline" color="#4CBFA4" mt={4}>
          목록으로
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <WriteBoard type="edit" initialValues={values} onSubmit={handleSubmit} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} w={140} variant="outline" color="#4CBFA4" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
