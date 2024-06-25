// Post.tsx

import { useState } from "react";
import { Container, Title, Text, Card, Group, Button } from "@mantine/core";
import Image from "next/image";
import testImage from "../public/assets/img_card_section.png";
import heart from "../public/assets/ic_heart.svg";
import search from "../public/assets/ic_search.svg";

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
  image?: NextImage;
}

function PostPage() {
  const bestPosts: Post[] = [
    {
      id: 1,
      title: "게시물 제목입니다.",
      author: "박동욱",
      date: "2024.02.24.",
      likes: 135,
      image: {
        src: "/path/to/image1.jpg",
        alt: "Description of image",
        width: 250,
        height: 300,
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

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSearchTerm(searchValue);
  };

  const handleSearchEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchTerm(searchValue);
    }
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
    <Container className="min-w-screen-sm align-center mx-auto max-w-screen-lg flex-col">
      <div className="mb-10 flex items-center justify-between">
        <Title className="text-left text-32 font-semibold leading-40 text-gray-800">베스트 게시글</Title>
        <Button className="rounded-md text-14 h-[45px] w-[160px] bg-green-200 text-white" onClick={() => {}}>
          게시물 등록하기
        </Button>
      </div>
      <div className="mb-8 flex flex-row gap-4">
        {bestPosts.map((post) => (
          <Card key={post.id} shadow="sm" radius="md" withBorder className="rounded-md h-[220px] w-[250px] overflow-hidden shadow-sm" component="a" href="/boards" target="_self">
            <Card.Section>{post.image && <Image src={testImage} alt={post.title} width={250} height={131} className="w-full object-cover" />}</Card.Section>
            <Group className="p-[19px] pb-[14px]">
              <Title order={2} className="text-18 leading-6 mb-[14px] font-semibold text-gray-800">
                {post.title}
              </Title>
              <Group justify="space-between" className="flex justify-between">
                <Group className="flex gap-2">
                  <Text className="text-14 text-gray-400">{post.author}</Text>
                  <Text className="text-14 text-gray-400">{post.date}</Text>
                </Group>
                <Text className="text-14 flex gap-1 text-gray-400">
                  <Image src={heart} alt="좋아요" width={18} height={18} /> {post.likes}개
                </Text>
              </Group>
            </Group>
          </Card>
        ))}
      </div>
      {/* 검색창과 정렬하기 */}
      <div className="mb-8 flex items-center justify-between">
        <form className="flex w-full flex-row">
          <div className="rounded-lg relative mr-5 flex h-[40px] w-full flex-row gap-2.5 bg-gray-100 px-[20px] py-[7px]">
            <Image src={search} alt="검색" width={22} height={22} />
            <input placeholder="제목을 검색해주세요" value={searchValue} onChange={handleSearchChange} onKeyPress={handleSearchEnter} className="w-full bg-gray-100" />
          </div>
          <Button className="rounded-md text-14 mr-5 h-[45px] w-[80px] bg-green-200 text-white" onClick={handleSearchClick}>
            검색
          </Button>
        </form>
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
        <Group>
          {currentPosts.map((post) => (
            <Card key={post.id} shadow="sm" padding="md" className="cursor-pointer hover:bg-gray-100" style={{ minWidth: 300 }}>
              <Title order={3} className="text-lg mb-2">
                {post.title}
              </Title>
              <Group>
                <Text size="sm" color="gray">
                  {post.author} | 좋아요 {post.likes}개 | {post.date}
                </Text>
              </Group>
            </Card>
          ))}
        </Group>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center">
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
