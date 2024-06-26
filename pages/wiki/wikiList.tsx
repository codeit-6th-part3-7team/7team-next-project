import UserCard from "@/src/components/UserCard";
import instance from "@/src/apis/axios";
import { useEffect, useState } from "react";
import { Article } from "@/src/types/wikiListTypes";

export default function WikiList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await instance.get(`/profiles`);
        // TODO: 데이터 전송 확인
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (Array.isArray(response.data.list)) {
          setArticles(response.data.list);
        } else {
          // NOTE: 배열이 아닐시 에러 출력
          // eslint-disable-next-line no-console
          console.error("API did not return an array");
        }
      } catch (error) {
        // NOTE: API 응답 실패시 에러 출력
        // eslint-disable-next-line no-console
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <div>헤더</div>
      <div>검색</div>
      {articles.map((article) => (
        <UserCard key={article.id} article={article} />
      ))}
      <div>페이지네이션</div>
    </div>
  );
}
