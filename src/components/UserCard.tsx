import Image from "next/image";
import userImageNull from "@/public/ic_image_null.svg";
import { UserCardProps } from "../types/wikiListTypes";

export default function UserCard({ articles }: UserCardProps) {
  return (
    <div>
      {articles.map((article) => (
        <article
          key={article.id}
          className="flex-col justify-between sm:flex md:flex-row lg:flex-row w-[340px] md:w-[700px] lg:w-[860px] h-[150px] md:h-[140px] lg:h-[140px] bg-[#fff] my-[24px] m-auto rounded-25 shadow-xl py-[24px]"
        >
          <div className="flex">
            <Image
              src={article.image ? article.image : userImageNull}
              alt={article.image ? "유저 이미지" : "기본 유저 이미지"}
              className="mx-[32px] rounded-full"
              width={85}
              height={85}
              draggable="false"
            />
            <div>
              <span className="text-[24px] font-[600] gap-[14px]">{article.name}</span>
              <div className="text-[14px] font-[400] text-gray-400">
                <span>{article.city}</span>
                {article.city && article.nationality && <span>,&nbsp;</span>}
                <span>{article.nationality}</span>
                <br />
                <span>{article.job}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end mr-[32px]">
            <div className="text-green-200 text-right">link</div>
          </div>
        </article>
      ))}
    </div>
  );
}
