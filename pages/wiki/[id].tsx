import axios from "@/src/apis/axios";
import checkWikiStatus from "@/src/apis/checkWikiStatus";
import EditWikiAuthModal from "@/src/components/EditWikiAuthModal";
import ProfileCard from "@/src/components/ProfileCard";
import { ProfileCardData, ProfileResponse } from "@/src/types/ProfileResponse";
import { Button, CopyButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useEffect, useState } from "react";

import ic_copy_link from "../../public/ic_copy_link.svg";

const TEST_CODE: string = "9ac0573f-7daa-4e2d-a1a2-9c7f6c9c4823";
// TODO 테스트 완료 후, code 변수 추가 할 때 삭제 예정

export default function Wiki() {
  const [wikiData, setWikiData] = useState<ProfileResponse>({
    id: 0,
    code: "",
    image: null,
    city: "",
    mbti: "",
    job: "",
    sns: "",
    birthday: "",
    nickname: "",
    bloodType: "",
    family: "",
    nationality: "",
    content: "",
    teamId: "",
    securityQuestion: "",
    updatedAt: "",
    name: "",
  });
  const [profileData, setProfileData] = useState<ProfileCardData>({
    city: "",
    mbti: "",
    job: "",
    sns: "",
    birthday: "",
    nickname: "",
    bloodType: "",
    nationality: "",
  });
  const [wikiUrl, setWikiUrl] = useState<string>("");

  // note mantine modal handler hook
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // note api 호출, url 설정 effect
  useEffect(() => {
    const getWikiDataByCode = async () => {
      try {
        const { data } = await axios.get(`profiles/${TEST_CODE}`);
        // TODO 프로필 데이터 호출 url path의 code 부분 변수로 수정 예정, 테스트용
        setWikiData(data);

        const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = data;
        const profileCardData: ProfileCardData = { city, mbti, job, sns, birthday, nickname, bloodType, nationality };
        setProfileData(profileCardData);

        const currentUrl: string = window.location.href;
        setWikiUrl(currentUrl);
      } catch (e) {
        // eslint-disable-next-line
        console.error("failed to fetch", e);
      }
    };
    getWikiDataByCode();
  }, []);

  const handleClickEdit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      notifications.show({
        title: "로그인 필요",
        message: "위키 수정을 위해 로그인이 필요합니다.",
        color: "red",
      });
      return;
    }
    const wikiStatus = await checkWikiStatus(TEST_CODE);
    if (wikiStatus) {
      openModal();
    }
  };

  return (
    <main className="max-w-[1200px] w-full mx-auto ">
      <div className="mx-4 flex justify-between gap-4">
        <section className="w-[860px] h-full mt-40 relative">
          <section className="w-[860px] h-28">
            <div className="h-12 mb-12 flex justify-between">
              <span className="leading-none text-50 font-semibold text-gray-800">{wikiData.name}</span>
              <Button color="green.1" size="md" onClick={handleClickEdit}>
                위키 참여하기
              </Button>
              <EditWikiAuthModal securityQuestion={wikiData.securityQuestion} opened={opened} closeModal={closeModal} wikiCode={TEST_CODE} />
            </div>
            <CopyButton value={wikiUrl}>
              {({ copied, copy }) => (
                <Button color={copied ? "gray.1" : "green.0"} leftSection={<Image src={ic_copy_link} width={20} height={20} alt="위키링크복사하기" />} onClick={copy}>
                  <span className="text-sm text-green-300 font-normal">{copied ? "Copied!" : wikiUrl}</span>
                </Button>
              )}
            </CopyButton>
          </section>
          <article className="w-[860px] h-auto pb-24 mt-14">{wikiData?.content}</article>
        </section>
        <ProfileCard profileData={profileData} profileImage={wikiData.image} />
      </div>
    </main>
  );
}
