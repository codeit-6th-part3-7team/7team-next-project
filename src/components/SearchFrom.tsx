import searchIcon from "@/public/ic_search.svg";
import Image from "next/image";
import { SearchPros } from "../types/wikiListTypes";

export default function SearchFrom({ value, setValue, page, setPage }: SearchPros) {
  return (
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
          className="w-full h-[45px] m-auto bg-gray-100 rounded-20 py-[20px] pl-[50px] pr-[15px] outline-none"
        />
        <div className="absolute left-[20px] top-1/2 transform -translate-y-1/2">
          <Image src={searchIcon} alt="검색 아이콘" width={22} height={22} draggable="false" />
        </div>
      </div>
    </section>
  );
}
