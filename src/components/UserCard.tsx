import Image from "next/image";
import userImageNull from "@/public/ic_image_null.svg";
import { UserCardProps } from "../types/wikiListTypes";

export default function UserCard({ article }: UserCardProps) {
  const userImage = article.image ? article.image : userImageNull;

  return (
    <article className="w-[860px] h-[142px] bg-[#fff] my-[10px] m-auto rounded-25 shadow-lg py-[24px] ">
      <div className="flex">
        <Image src={userImage} alt={article.image ? "유저 이미지" : "기본 유저 이미지"} className="flex-none mx-[32px] rounded-full" width={85} height={85} />
        <div className="flex-1 w-[150px] h-[100px]">
          <span className="text-[24px] font-[600] gap-[14px]">{article.name}</span>
          <div className="text-[14px] font-[400] text-gray-400">
            <span>{article.city}</span>
            <span>,&nbsp;</span>
            <span>{article.nationality}</span>
            <br />
            <span>{article.job}</span>
          </div>
        </div>
        <div className="flex-none mr-[32px]">link</div>
      </div>
    </article>
  );
}
