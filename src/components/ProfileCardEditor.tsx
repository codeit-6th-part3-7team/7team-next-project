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
    <section className="flex h-[511px] flex-col items-center gap-5 rounded-xl border-none px-[34px] py-4 shadow-lg shadow-gray-200">
      <Image className="size-[62px] rounded-full object-cover" src={profileImage || ic_profile_skeleton} alt="프로필이미지" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          {/* todo 프로필카드 초기데이터 prop 설정 후 map 함수 사용해서 렌더링 */}
          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="flex items-center gap-5">
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
                    height: "34px",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: theme.colors.gray[0],
                    "--input-bd-focus": theme.colors.green[1],
                    "--input-placeholder-color": theme.colors.gray[2],
                  },
                })}
                defaultValue={value}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
