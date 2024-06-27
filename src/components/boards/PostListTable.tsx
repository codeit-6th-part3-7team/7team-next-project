import React from "react";
import { Post } from "@/src/types/boardTypes";
import formatDateToCustom from "@/src/utils/formatDate";

interface Props {
  posts: Post[];
}

function PostListTable({ posts }: Props) {
  return (
    <table className="mb-[60px] min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
      <thead className="border-b border-gray-200 bg-gray-100">
        <tr className="text-xs font-medium uppercase tracking-wider text-gray-600">
          <th className="w-12 px-4 py-3 text-center">번호</th>
          <th className="w-64 px-4 py-3 text-center">제목</th>
          <th className="w-16 px-4 py-3 text-center">작성자</th>
          <th className="w-12 px-4 py-3 text-center">좋아요 </th>
          <th className="w-24 px-4 py-3 text-center">작성일자</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {posts.map((post) => (
          <tr key={post.id}>
            <td className="px-3 py-3 text-center">{post.id}</td>
            <td className="px-3 py-3 text-center">{post.title}</td>
            <td className="px-3 py-3 text-center">{post.writer.name}</td>
            <td className="px-3 py-3 text-center">{post.likeCount}</td>
            <td className="px-3 py-3 text-center">{formatDateToCustom(post.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PostListTable;
