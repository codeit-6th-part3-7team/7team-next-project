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

const TEST_CODE: string = "77348674-31f5-4d09-8c1c-c92a1af25f63";
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

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

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

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <main className="max-w-[744px] md:max-w-[1200px] xl:max-w-[1520px] h-full mx-auto">
        <section className="mx-5 md:mx-20 mt-16 flex flex-col justify-between gap-3 md:gap-6">
          {/* content header */}
          <div className="xl:max-w-[860px] xl:mr-[400px] flex flex-col justify-between gap-6 md:gap-8">
            {/* content header label */}
            <div className="h-[43px] px-auto flex justify-between">
              <span className="leading-none text-32 md:text-[48px] font-semibold text-gray-800">{wikiData.name}</span>
              <Button className="" color="green.1" size="sm" onClick={handleClickEdit}>
                위키 참여하기
              </Button>
            </div>
            <div className="w-50 md:w-[235px]">
              <CopyButton value={wikiUrl}>
                {({ copied, copy }) => (
                  <Button size="sm" color={copied ? "gray.1" : "green.0"} leftSection={<Image src={ic_copy_link} alt="위키링크복사하기" />} onClick={copy}>
                    <div className="truncate text-sm text-green-300 font-normal">{copied ? "Copied!" : wikiUrl}</div>
                  </Button>
                )}
              </CopyButton>
            </div>
          </div>
          <div className="xl:fixed xl:top-[120px] xl:left-[70%]">
            <ProfileCard profileData={profileData} profileImage={wikiData.image} toggleProfile={toggleProfile} isProfileOpen={isProfileOpen} />
          </div>
          {/* content text */}
          <article className="h-auto pb-24 mt-8 xl:max-w-[860px] xl:mr-[400px]">{wikiData?.content}</article>
        </section>
      </main>
      <EditWikiAuthModal securityQuestion={wikiData.securityQuestion} opened={opened} closeModal={closeModal} wikiCode={TEST_CODE} />
    </>
  );
}
