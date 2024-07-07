import ic_copy_link from "@/public/ic_copy_link.svg";
import instance from "@/src/apis/axios";
import checkWikiStatus from "@/src/apis/checkWikiStatus";
import EditWikiAuthModal from "@/src/components/EditWikiAuthModal";
import ProfileCard from "@/src/components/ProfileCard";
import ProfileCardEditor from "@/src/components/ProfileCardEditor";
import WikiEditor from "@/src/components/WikiEditor";
import { ProfileCardData, ProfileResponse } from "@/src/types/ProfileResponse";
import { Button, CopyButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WIKI_INITIAL = {
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
};

const PROFILE_INITIAL = {
  city: "",
  mbti: "",
  job: "",
  sns: "",
  birthday: "",
  nickname: "",
  bloodType: "",
  nationality: "",
};

type RenderedHTMLProps = {
  htmlContent: string;
};

function RenderedHTML({ htmlContent }: RenderedHTMLProps) {
  function createMarkup() {
    return { __html: htmlContent };
  }
  return (
    <div className="rendered-html prose">
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default function Wiki() {
  const [wikiData, setWikiData] = useState<ProfileResponse>(WIKI_INITIAL);
  const [profileData, setProfileData] = useState<ProfileCardData>(PROFILE_INITIAL);
  const [wikiUrl, setWikiUrl] = useState<string>("");
  const [formData, setFormData] = useState({});
  const [answer, setAnswer] = useState<string>("");
  const [wikiCode, setWikiCode] = useState<string>("");

  const router = useRouter();
  const { id } = router.query as { id: string };

  // note mantine modal handler hook
  const [opened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);

  // note profileCard(모바일, 태블릿) 상세보기 상태 state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // note 수정모드 여부 확인 state
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // note api 호출, url 설정 effect
  useEffect(() => {
    const getWikiDataByCode = async () => {
      try {
        const response = await instance.get(`/profiles`, { params: { name: id } });
        const wikiIdCode = response.data.list[0].code;
        setWikiCode(wikiIdCode);

        const { data } = await instance.get(`/profiles/${wikiIdCode}`);
        setWikiData(data);

        const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = data;
        const profileCardData: ProfileCardData = { city, mbti, job, sns, birthday, nickname, bloodType, nationality };
        setProfileData(profileCardData);

        const currentUrl: string = window.location.href;
        setWikiUrl(currentUrl);

        // note formData 정상 post 요청하려면 전체 항목이 모두 필요함..
        const initialProfileData = {
          securityAnswer: answer,
          securityQuestion: data.securityQuestion,
          nationality: data.nationality,
          family: data.family,
          bloodType: data.bloodType,
          nickname: data.nickname,
          birthday: data.birthday,
          sns: data.sns,
          job: data.job,
          mbti: data.mbti,
          city: data.city,
          image: data.image,
          content: data.content,
        };
        setFormData(initialProfileData);
      } catch (e) {
        // eslint-disable-next-line
        console.error("failed to fetch", e);
      }
    };
    getWikiDataByCode();
  }, [id, isEditing]);

  const handleClickEdit = async () => {
    if (typeof id === "string") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        notifications.show({
          title: "로그인 필요",
          message: "위키 수정을 위해 로그인이 필요합니다.",
          color: "red",
        });
        router.push("/login");
        return;
      }
      const wikiStatus = await checkWikiStatus(wikiCode);
      if (wikiStatus) {
        openAuthModal();
      }
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeContent = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
        securityAnswer: answer,
      };
      const res = await instance.patch(`/profiles/${wikiCode}`, updatedFormData);
      if (res) {
        notifications.show({
          title: "저장 완료",
          message: "프로필이 성공적으로 저장되었습니다.",
          color: "blue",
        });
        setIsEditing(false);
        setAnswer("");
      }
    } catch (error) {
      notifications.show({
        title: "저장 실패",
        message: "프로필 저장 중 오류가 발생했습니다.",
        color: "red",
      });
    }
  };

  return (
    <>
      {isEditing ? (
        <form className="m-3 flex min-h-[1100px] flex-col gap-[15px] md:mx-[60px] md:mt-[47px] md:gap-[10px] xl:mx-auto xl:max-w-[1700px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[15px] md:gap-[10px] xl:fixed xl:left-[70%] xl:top-[120px] xl:flex-col-reverse">
            <div className="flex h-10 items-center justify-between md:mb-[10px]">
              <span className="text-32 font-semibold leading-none text-gray-800 md:text-[48px] xl:invisible">{wikiData.name}</span>
              <div className="flex gap-[10px]">
                <Button
                  onClick={() => {
                    router.back();
                  }}
                  color="white"
                  style={(theme) => ({
                    width: "65px",
                    height: "40px",
                    border: "solid",
                    borderWidth: "1px",
                    borderColor: theme.colors.green[1],
                    color: theme.colors.green[1],
                    "--button-hover": theme.colors.green[0],
                  })}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  color="green.1"
                  style={(theme) => ({
                    width: "65px",
                    height: "40px",
                    border: "solid",
                    borderWidth: "1px",
                    borderColor: theme.colors.green[1],
                  })}
                >
                  저장
                </Button>
              </div>
            </div>
            <ProfileCardEditor profileData={profileData} profileImage={wikiData.image} handleChangeProfile={handleChangeProfile} />
          </div>
          <div className="flex flex-col gap-4 md:mt-[30px] xl:ml-[100px] xl:mr-[530px] xl:mt-0 xl:min-w-[700px] xl:max-w-[1120px]">
            <WikiEditor initialData={wikiData.content} handleChangeContent={handleChangeContent} title={wikiData.name} />
          </div>
        </form>
      ) : (
        <main className="mx-auto h-full max-w-[744px] md:max-w-[1200px] xl:max-w-[1520px]">
          <section className="mx-5 mt-16 flex flex-col justify-between gap-3 md:mx-20 md:gap-6">
            {/* content header */}
            <div className="flex flex-col justify-between gap-6 md:gap-8 xl:mr-[450px] xl:max-w-[860px]">
              {/* content header label */}
              <div className="px-auto flex h-[43px] justify-between">
                <span className="text-32 font-semibold leading-none text-gray-800 md:text-[48px]">{wikiData.name}</span>
                <Button color="green.1" size="sm" onClick={handleClickEdit} className="button">
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
            {/* content text */}
            {/* note 위키 콘텐츠 없을 때 조건부 렌더링 */}
            {wikiData?.content.length > 0 ? (
              <article className="mt-8 h-auto pb-24 xl:mr-[400px] xl:max-w-[860px]">
                <RenderedHTML htmlContent={wikiData.content} />
              </article>
            ) : (
              <div className="mt-8 flex h-auto flex-col items-center justify-center bg-gray-100 p-12 xl:mr-[400px] xl:max-w-[860px]">
                <span className="text-16 text-gray-400">아직 작성된 내용이 없네요</span>
                <span className="text-16 text-gray-400">위키에 참여해 보세요!</span>
                <Button className="button mt-5" color="green.1" size="sm">
                  시작하기
                </Button>
              </div>
            )}
          </section>
        </main>
      )}
      <EditWikiAuthModal
        securityQuestion={wikiData.securityQuestion}
        opened={opened}
        openModal={openAuthModal}
        closeModal={closeAuthModal}
        wikiCode={wikiCode}
        setAnswer={setAnswer}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
}
