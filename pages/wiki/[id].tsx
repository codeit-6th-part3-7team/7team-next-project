import ic_copy_link from "@/public/ic_copy_link.svg";
import instance from "@/src/apis/axios";
import checkWikiStatus from "@/src/apis/checkWikiStatus";
import EditWikiAuthModal from "@/src/components/EditWikiAuthModal";
import ProfileCard from "@/src/components/ProfileCard";
import { ProfileCardData, ProfileResponse } from "@/src/types/ProfileResponse";
import { Button, CopyButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getWikiDataByCode = async () => {
      if (typeof id === "string") {
        try {
          const response = await instance.get(`/profiles`, { params: { name: id } });
          const firstItem = response.data.list[0].code;
          const { data } = await instance.get(`/profiles/${firstItem}`);
          setWikiData(data);

          const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = data;
          const profileCardData: ProfileCardData = { city, mbti, job, sns, birthday, nickname, bloodType, nationality };
          setProfileData(profileCardData);

          const currentUrl: string = window.location.href;
          setWikiUrl(currentUrl);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch data:", e);
        }
      }
    };

    getWikiDataByCode();
  }, [id]);

  const handleClickEdit = async () => {
    if (typeof id === "string") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        notifications.show({
          title: "로그인 필요",
          message: "위키 수정을 위해 로그인이 필요합니다.",
          color: "red",
        });
        return;
      }
      const wikiStatus = await checkWikiStatus(id);
      if (wikiStatus) {
        openModal();
      }
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <main className="mx-auto h-full max-w-[744px] md:max-w-[1200px] xl:max-w-[1520px]">
        <section className="mx-5 mt-16 flex flex-col justify-between gap-3 md:mx-20 md:gap-6">
          <div className="flex flex-col justify-between gap-6 md:gap-8 xl:mr-[400px] xl:max-w-[860px]">
            <div className="px-auto flex h-[43px] justify-between">
              <span className="text-32 font-semibold leading-none text-gray-800 md:text-[48px]">{wikiData.name}</span>
              <Button color="green.1" size="sm" onClick={handleClickEdit}>
                위키 참여하기
              </Button>
            </div>
            <CopyButton value={wikiUrl}>
              {({ copied, copy }) => (
                <button
                  type="button"
                  className={`flex h-[34px] max-w-[235px] items-center gap-1 rounded-[10px] px-[10px] text-green-300 ${copied ? "bg-gray-200" : "bg-green-100 hover:brightness-95"}`}
                  onClick={copy}
                >
                  <Image className="h-5 w-5" src={ic_copy_link} alt="위키링크복사하기" />
                  <div className="truncate text-sm font-normal">{copied ? "Copied!" : wikiUrl}</div>
                </button>
              )}
            </CopyButton>
          </div>
          <div className="xl:fixed xl:left-[70%] xl:top-[120px]">
            <ProfileCard profileData={profileData} profileImage={wikiData.image} toggleProfile={toggleProfile} isProfileOpen={isProfileOpen} />
          </div>
          {wikiData && wikiData.content && wikiData.content.length > 0 ? (
            <article className="mt-8 h-auto pb-24 xl:mr-[400px] xl:max-w-[860px]">{wikiData.content}</article>
          ) : (
            <div className="mt-8 flex h-auto flex-col items-center justify-center bg-gray-100 p-12 xl:mr-[400px] xl:max-w-[860px]">
              <span className="text-16 text-gray-400">아직 작성된 내용이 없네요</span>
              <span className="text-16 text-gray-400">위키에 참여해 보세요!</span>
              <Button className="mt-5" color="green.1" size="sm">
                시작하기
              </Button>
            </div>
          )}
        </section>
      </main>
      {typeof id === "string" && <EditWikiAuthModal securityQuestion={wikiData.securityQuestion} opened={opened} closeModal={closeModal} wikiCode={id} />}
    </>
  );
}
