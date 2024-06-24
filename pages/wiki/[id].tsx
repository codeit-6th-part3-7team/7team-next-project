import axios from "@/apis/axios";
import ProfileCard from "@/components/ProfileCard";
import { ProfileResponse } from "@/types/ProfileResponse";
import { useEffect, useState } from "react";
import { Button, CopyButton } from "@mantine/core";
import ic_copy_link from "../../public/ic_copy_link.svg";
import Image from "next/image";

const TEST_CODE: string = "77348674-31f5-4d09-8c1c-c92a1af25f63";
// TODO 테스트 완료 후, code 변수 추가 할 때 삭제 예정

export default function Wiki() {
  const [wikiData, setWikiData] = useState<ProfileResponse>();
  const [wikiUrl, setWikiUrl] = useState<string>("");

  // api 호출, url 설정 effect
  useEffect(() => {
    const getWikiDataByCode = async () => {
      const { data } = await axios.get(`profiles/${TEST_CODE}`);
      // TODO 프로필 데이터 호출 url path의 code 부분 변수로 수정 예정, 테스트용
      if (data) {
        setWikiData(data);
      }
    };

    getWikiDataByCode();
    const currentUrl: string = window.location.href;
    setWikiUrl(currentUrl);
  }, []);

  return (
    <main className="w-screen h-screen">
      <section className="w-[860px] h-28 mx-auto mt-40">
        <ProfileCard />
        <section className="w-[860px] h-28">
          <div className="flex justify-between">
            <span className="text-50 font-semibold text-gray-800">title</span>
            {/* todo 라이브러리용 색상 theme 설정 필요 */}
            <Button color="green">hop in</Button>
          </div>
          <CopyButton value={wikiUrl}>
            {({ copied, copy }) => (
              <Button color={copied ? "gray" : "grape"} leftSection={<Image src={ic_copy_link} width={20} height={20} alt="위키링크복사하기" />} onClick={copy}>
                <span className="text-sm text-green-200 font-normal">{copied ? "Copied!" : wikiUrl}</span>
              </Button>
            )}
          </CopyButton>
        </section>
        <article className="w-[860px] h-auto pb-24 mt-14">
          ContentContentContentContentContent ContentContentContentContentContent ContentContentContentContentContent ContentContentContentContentContent
        </article>
      </section>
    </main>
  );
}
