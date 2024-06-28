// Post.tsx

import { useState } from "react";
import { Container, Title, Text, Card, Group, TextInput, Button } from "@mantine/core"; // Mantine의 필요한 컴포넌트를 임포트합니다.
import Image from "next/image";
import Link from "next/link";

interface NextImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  image?: NextImage ;
}

function PostPage() {
  // Best 게시글 데이터 예시 (임의로 설정)
  const bestPosts: Post[] = [
    {
      id: 1,
      title: "Best Post 1",
      author: "Jane Smith",
      date: "June 20, 2024",
      likes: 15,
      image: {
        src: "/path/to/image1.jpg", // 이미지 경로
        alt: "Description of image", // 이미지 alt 텍스트 (optional)
        width: 250, // 이미지 너비 (optional)
        height: 300, // 이미지 높이 (optional)
      },
    },
    {
      id: 2,
      title: "Best Post 2",
      author: "Michael Johnson",
      date: "June 22, 2024",
      likes: 20,
      image: {
        src: "/path/to/image1.jpg",
        alt: "Description of image",
        width: 250,
        height: 300, 
      },
    },
    {
      id: 3,
      title: "Best Post 3",
      author: "Emma Brown",
      date: "June 23, 2024",
      likes: 12,
      image: {
        src: "/path/to/image1.jpg",
        alt: "Description of image",
        width: 250,
        height: 300, 
      },
    },
    {
      id: 4,
      title: "Best Post 4",
      author: "David Lee",
      date: "June 24, 2024",
      likes: 18,
      image: {
        src: "/path/to/image1.jpg",
        alt: "Description of image",
        width: 250,
        height: 300, 
      },
    },
  ];

  // 다른 게시글 목록 예시
  const PostList: Post[] = [
    { id: 1, title: "Post 1", author: "Alice Johnson", likes: 8, date: "June 15, 2024" },
    { id: 2, title: "Post 2", author: "Bob Lee", likes: 12, date: "June 18, 2024" },
    { id: 3, title: "Post 3", author: "Eve Brown", likes: 5, date: "June 20, 2024" },
    { id: 4, title: "Post 4", author: "Grace Smith", likes: 10, date: "June 22, 2024" },
    { id: 5, title: "Post 5", author: "Jack Davis", likes: 7, date: "June 25, 2024" },
    { id: 6, title: "Post 6", author: "Kate Wilson", likes: 9, date: "June 28, 2024" },
    { id: 7, title: "Post 7", author: "Leo Garcia", likes: 15, date: "June 30, 2024" },
    { id: 8, title: "Post 8", author: "Mia Clark", likes: 18, date: "July 2, 2024" },
    { id: 9, title: "Post 9", author: "Oliver White", likes: 6, date: "July 5, 2024" },
    { id: 10, title: "Post 10", author: "Sophia Moore", likes: 11, date: "July 8, 2024" },
    { id: 11, title: "Post 11", author: "William Turner", likes: 14, date: "July 10, 2024" },
    { id: 12, title: "Post 12", author: "Zoe Martinez", likes: 20, date: "July 12, 2024" },
    { id: 13, title: "Post 13", author: "Samuel Brown", likes: 17, date: "July 15, 2024" },
    { id: 14, title: "Post 14", author: "Emily Wilson", likes: 9, date: "July 18, 2024" },
    { id: 15, title: "Post 15", author: "Daniel Adams", likes: 13, date: "July 20, 2024" },
    { id: 16, title: "Post 16", author: "Ava Garcia", likes: 11, date: "July 22, 2024" },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const filteredPosts = PostList.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

 
  const indexOfNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfNextPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfNextPost);

 
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container className="max-w-screen-lg  min-w-screen-sm mx-auto flex-col align-center">
      <div className="flex items-center justify-between">
        <Title order={1}>베스트 게시글</Title>
        <Button onClick={() => {}}>게시글 등록하기</Button>
      </div>
      <div className="flex flex-row gap-1 overflow-x-auto mb-8">
        {bestPosts.map((post) => (
          <Card key={post.id} shadow="sm" padding="lg" style={{ width: 250, height: 300 }}>
            {post.image && (
  <Image src={post.image.src} alt={post.title} width={250} height={150} />
)}
            <Title order={2} className="text-xl my-2">
              {post.title}
            </Title>
            <Group  className="mb-4">
              <Text size="sm" color="gray">
                {post.author} | {post.date}
              </Text>
            </Group>
            <Group >
              <Text size="sm" color="gray">
                좋아요 {post.likes}개
              </Text>
            </Group>
          </Card>
        ))}
      </div>
      {/* 검색창과 정렬하기 */}
      <div className="flex items-center justify-between mb-8">
        <TextInput placeholder="게시글 검색..." value={searchTerm} onChange={handleSearchChange} className="w-1/2 mr-4" />
        <div className="flex items-center">
          <Text className="mr-2">정렬하기:</Text>
          <Button variant={sortBy === "latest" ? "filled" : "outline"} onClick={() => handleSortChange("latest")} className="mr-2">
            최신순
          </Button>
          <Button variant={sortBy === "likes" ? "filled" : "outline"} onClick={() => handleSortChange("likes")}>
            좋아요 순
          </Button>
        </div>
      </div>

      {/* 현재 페이지의 게시글 목록 */}
      <div className="mt-8">
        <Title order={2} className="text-2xl mb-4">
          다른 게시글 목록
        </Title>
        <Group >
          {currentPosts.map((post) => (
            <Card key={post.id} shadow="sm" padding="md" className="cursor-pointer hover:bg-gray-100" style={{ minWidth: 300 }}>
              <Title order={3} className="text-lg mb-2">
                {post.title}
              </Title>
              <Group >
                <Text size="sm" color="gray">
                  {post.author} | 좋아요 {post.likes}개 | {post.date}
                </Text>
              </Group>
            </Card>
          ))}
        </Group>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, index) => (
          <Button key={index + 1} onClick={() => paginate(index + 1)} variant={currentPage === index + 1 ? "filled" : "outline"} className="mx-1">
            {index + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
}



export default PostPage;
