import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
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

  const handleLoad = useCallback(async () => {
    if (!id) {
      return;
    }
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
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  const handleSubmit = async (data: { title: string; content: string; image?: string }) => {
    if (!id) {
      return;
    }

    setLoading(true);
    try {
      await instance.patch(`/articles/${id}`, data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
      router.push(`/boards/${id}`);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

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
        <p className="text-red-200">{error?.message}</p>
        <Button href="/boards" component={Link} variant="outline" color="green" mt={4}>
          목록으로
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <WriteBoard type="edit" initialValues={values} onSubmit={handleSubmit} />
      <Flex justify="center" h={50}>
        <Button href="/boards" component={Link} variant="outline" color="green" px={40}>
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
