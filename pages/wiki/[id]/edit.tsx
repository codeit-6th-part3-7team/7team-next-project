import ProfileCardEditor from "@/src/components/ProfileCardEditor";
import WikiEditor from "@/src/components/WikiEditor";
import { ProfileCardData, ProfileResponse } from "@/src/types/ProfileResponse";
import { useEffect, useState } from "react";
import axios from "@/src/apis/axios";

const TEST_CODE: string = "77348674-31f5-4d09-8c1c-c92a1af25f63";
// TODO 테스트 완료 후, code 변수 추가 할 때 삭제 예정

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

const PROFILE_PATCH_INITIAL = {
  securityAnswer: "",
  securityQuestion: "",
  nationality: "",
  family: "",
  bloodType: "",
  nickname: "",
  birthday: "",
  sns: "",
  job: "",
  mbti: "",
  city: "",
  image: "",
  content: "",
};

export default function WikiEdit() {
  const [wikiData, setWikiData] = useState<ProfileResponse>(WIKI_INITIAL);
  const [profileData, setProfileData] = useState<ProfileCardData>(PROFILE_INITIAL);
  const [formData, setFormData] = useState(PROFILE_PATCH_INITIAL);

  useEffect(() => {
    const getWikiDataByCode = async () => {
      try {
        const { data } = await axios.get(`profiles/${TEST_CODE}`);
        // TODO 프로필 데이터 호출 url path의 code 부분 변수로 수정 예정, 테스트용
        setWikiData(data);

        const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = data;
        const profileCardData: ProfileCardData = { city, mbti, job, sns, birthday, nickname, bloodType, nationality };
        setProfileData(profileCardData);
      } catch (e) {
        // eslint-disable-next-line
        console.error("failed to fetch", e);
      }
    };
    getWikiDataByCode();
  }, []);

  return (
    <div className="m-3">
      <ProfileCardEditor profileData={profileData} profileImage={wikiData.image} />
      <div className="mt-3 flex flex-col gap-4">
        <WikiEditor initialData={wikiData.content} />
      </div>
    </div>
  );
}
