import React, { useEffect, useState } from "react";
import { Container, Title, Button } from "@mantine/core";

import Pagination from "@/src/components/Pagination";
import PostListTable from "@/src/components/boards/PostListTable";
import BestPosts from "@/src/components/boards/BestPost";
import SearchBar from "@/src/components/boards/SearchBar";

import SortDropdown from "@/src/components/boards/SortDropdown";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
}

function PostPage() {
  const bestPosts: Post[] = [
    {
      id: 1,
      title: "게시물 제목입니다.",
      author: "박동욱",
      date: "2024.02.24.",
      likes: 135,
    },
    {
      id: 2,
      title: "Best Post 2",
      author: "Michael Johnson",
      date: "June 22, 2024",
      likes: 20,
    },
    {
      id: 3,
      title: "Best Post 3",
      author: "Emma Brown",
      date: "June 23, 2024",
      likes: 12,
    },
    {
      id: 4,
      title: "Best Post 4",
      author: "David Lee",
      date: "June 24, 2024",
      likes: 18,
    },
  ];

  const postList: Post[] = [
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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(postList);

  useEffect(() => {
    const sortedPosts = [...filteredPosts];
    if (sortBy === "latest") {
      sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "popular") {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setFilteredPosts(sortedPosts);
  }, [sortBy, filteredPosts]);

  const handleSortLatest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSortBy("latest");
  };

  const handleSortPopular = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSortBy("popular");
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    const filtered = postList.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const indexOfNextPost = currentPage * 10;
  const indexOfFirstPost = indexOfNextPost - 10;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfNextPost);
  const totalPages = Math.ceil(filteredPosts.length / 10);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container className="min-w-screen-sm align-center mx-auto max-w-screen-lg flex-col">
      <div className="mb-10 flex items-center justify-between">
        <Title className="text-left text-32 font-semibold leading-40 text-gray-800">베스트 게시글</Title>
        <Button className="h-[45px] w-[160px] rounded-md bg-green-200 text-14 text-white" onClick={() => {}}>
          게시물 등록하기
        </Button>
      </div>
      <BestPosts bestPosts={bestPosts} />
      <div className="mb-8 flex w-full justify-between gap-2.5">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <SortDropdown sortBy={sortBy} onSortLatest={handleSortLatest} onSortPopular={handleSortPopular} />
      </div>
      <PostListTable posts={currentPosts} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
    </Container>
  );
}

export default PostPage;
