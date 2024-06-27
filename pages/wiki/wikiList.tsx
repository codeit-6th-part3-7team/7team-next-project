import UserCard from "@/src/components/UserCard";
import instance from "@/src/apis/axios";
import Image from "next/image";
import searchIcon from "@/public/ic_search.svg";
import { useEffect, useState } from "react";
import { Article } from "@/src/types/wikiListTypes";
import Pagination from "@/src/components/Pagination";
import NoSearchImage from "@/public/img_no_search.webp";

export default function WikiList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [value, setValue] = useState<string>("");
  const [searchText, setSearchText] = useState<string>(value);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const maxLength = 10;

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await instance.get(`/profiles`, { params: { name: value, page } });
        if (Array.isArray(response.data.list)) {
          setArticles(response.data.list);
          setTotalPages(Math.ceil(response.data.totalCount / 3));
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

    if (value.length > maxLength) {
      setSearchText(`${value.substring(0, maxLength - 1)}...`);
    } else if (value.length < maxLength) {
      setSearchText(`${value}`);
    }
    fetchArticles();
  }, [page, value, searchText]);

  const searchResults = value ? articles.filter((article) => article.name.toLowerCase().includes(value.toLowerCase())) : articles;

  return (
    <div className="w-[400px] md:w-[700px] lg:w-[1000px] m-auto">
      <header>
        <div>헤더</div>
      </header>
      <main>
        <section className="flex justify-center align-center mx-[20px]">
          <div className="relative w-[340px] md:w-[700px] lg:w-[860px]">
            <input
              type="text"
              name="위키 검색"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (page > 1) {
                  setPage(1);
                }
              }}
              placeholder="이름으로 위키 찾기"
              className="w-full h-[45px] m-auto bg-gray-100 rounded-20 py-[10px] pl-[55px] outline-none"
            />
            <div className="absolute left-[20px] top-1/2 transform -translate-y-1/2">
              <Image src={searchIcon} alt="검색 아이콘" width={22} height={22} draggable="false" />
            </div>
          </div>
        </section>
        <section className="w-[340px] md:w-[700px] lg:w-[860px] mb-[60px] m-auto my-[16px] text-[16px] font-[400] text-gray-400">
          {value && searchResults.length > 0 ? (
            <p>
              &quot;{searchText}&quot;님을 총<span className="text-green-200">&nbsp;{searchResults.length}</span>명 찾았습니다.
            </p>
          ) : (
            <br />
          )}
        </section>
        <section className="h-[470px] my-20">
          {searchResults.length > 0 ? (
            searchResults.map((article) => <UserCard key={article.id} articles={[article]} />)
          ) : (
            <div>
              <p className="py-[32px] text-center text-[20px] font-[500] text-gray-400">&quot;{searchText}&quot;과/와 일치하는 검색 결과가 없어요.</p>
              <Image src={NoSearchImage} alt="검색 결과 없음 이미지" width={144} height={144} draggable="false" className="m-auto" />
            </div>
          )}
        </section>
        <footer>{searchResults.length > 0 ? <Pagination totalPages={totalPages} currentPage={page} onPageChange={(newPage) => setPage(newPage)} /> : <br />}</footer>
      </main>
    </div>
  );
}
