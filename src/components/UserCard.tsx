import Image from "next/image";
import userImageNull from "@/public/ic_image_null.svg";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import icCopy from "@/public/ic_copy.svg";
import Link from "next/link";
import { UserCardProps } from "../types/wikiListTypes";

export default function UserCard({ articles }: UserCardProps) {
  return (
    <div>
      {articles.map((article) => (
        <div className="relative" key={article.id}>
          <Link key={article.id} href={`/wiki/${article.id}`}>
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
            </article>
          </Link>
          <div className="absolute bottom-6 right-6">
            <CopyButton value={article.code} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                  <button
                    className="flex align-center w-[150px] md:w-[200px] lg:w-[230px] ml-[150px] md:text-14 lg:text-14 font-[400] text-green-200 bg-green-100 rounded-10"
                    type="button"
                    onClick={copy}
                  >
                    <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                      {copied ? <IconCheck style={{ width: 20 }} /> : <Image src={icCopy} alt="링크 복사 아이콘" style={{ width: 20 }} />}
                    </ActionIcon>
                    <span className="truncate">{article.code}</span>
                  </button>
                </Tooltip>
              )}
            </CopyButton>
          </div>
        </div>
      ))}
    </div>
  );
}
