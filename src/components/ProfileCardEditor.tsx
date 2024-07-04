import ic_profile_skeleton from "@/public/ic_profile_skeleton.webp";
import { TextInput } from "@mantine/core";
import Image from "next/image";
import { ProfileCardData } from "../types/ProfileResponse";

type ProfileCardProps = {
  profileData: ProfileCardData;
  profileImage: string | null;
  handleChangeProfile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const labels: Record<keyof ProfileCardData, string> = {
  city: "거주 도시",
  mbti: "MBTI",
  job: "직업",
  sns: "SNS 계정",
  birthday: "생일",
  nickname: "별명",
  bloodType: "혈액형",
  nationality: "국적",
};

export default function ProfileCardEditor({ profileData, profileImage, handleChangeProfile }: ProfileCardProps) {
  return (
    <section className="flex h-[511px] flex-col items-center gap-5 rounded-xl border-none px-[34px] py-4 shadow-lg shadow-gray-200 md:h-[388px] xl:h-[670px] xl:max-w-[400px] xl:gap-4">
      <Image className="size-[62px] rounded-full object-cover md:size-[72px] xl:my-3 xl:size-[200px]" src={profileImage || ic_profile_skeleton} alt="프로필이미지" />
      <div className="flex flex-col gap-4 md:mt-3 md:grid md:grid-cols-2 md:gap-x-10 xl:flex xl:flex-col">
        {/* todo 프로필카드 초기데이터 prop 설정 후 map 함수 사용해서 렌더링 */}
        {Object.entries(profileData).map(([key, value]) => (
          <div key={key} className="flex h-[34px] items-center gap-5 md:h-[45px] xl:h-[34px]">
            <div className="w-[60px] text-12 text-gray-400 md:text-14">{labels[key as keyof ProfileCardData]}</div>
            <TextInput
              key={key}
              name={key}
              onChange={handleChangeProfile}
              placeholder="정보를 입력해 주세요"
              styles={(theme) => ({
                input: {
                  minWidth: "200px",
                  fontSize: "12px",
                  borderRadius: "10px",
                  borderWidth: "1px",
                  height: "34px",
                  backgroundColor: theme.colors.gray[0],
                  "--input-bd-focus": theme.colors.green[2],
                  "--input-placeholder-color": theme.colors.gray[2],
                  // todo: 반응형으로 인풋 자체의 높이를 조정하고 싶은데 방법을 못찾겠습니다..
                },
              })}
              variant="filled"
              defaultValue={value}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
