import Image from "next/image";
import userImageNull from "@/public/ic_image_null.svg";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import icCopy from "@/public/ic_copy.svg";
import Link from "next/link";
import { UserCardProps } from "../types/wikiListTypes";

export default function UserCard({ articles }: UserCardProps) {
  const handleLinkClick = (id: string, code: string) => `/wiki/${id}?code=${encodeURIComponent(code)}`;

  return (
    <div>
      {articles.map((article) => (
        <div className="relative" key={article.id}>
          <Link href={handleLinkClick(article.id, article.code)} as={`/wiki/${article.id}`}>
            <article className="flex-col justify-between sm:flex md:flex-row lg:flex-row w-[340px] md:w-[700px] lg:w-[860px] h-[150px] md:h-[140px] lg:h-[140px] bg-[#fff] my-[24px] m-auto rounded-25 shadow-xl py-[24px]">
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
          <div className="absolute bottom-4 right-6">
            <CopyButton value={`${window.location.origin}/wiki/${article.id}`} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                  <button className="flex items-center w-[150px] md:w-[220px] lg:w-[220px] md:text-14 lg:text-14 font-[400] text-green-200 bg-green-100 rounded-10" type="button" onClick={copy}>
                    <ActionIcon variant="gradient" size="md" aria-label="위키 복사 버튼" gradient={{ from: "#EEF9F6", to: "#EEF9F6", deg: 90 }}>
                      {copied ? <IconCheck style={{ width: 20, color: "#4CBFA4" }} /> : <Image src={icCopy} alt="링크 복사 아이콘" style={{ width: 20 }} />}
                    </ActionIcon>
                    <span className="truncate">{`${window.location.origin}/wiki/${article.id}`}</span>
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
