import { ProfileCardData } from "@/src/types/ProfileResponse";
import Image from "next/image";

import ic_profile_skeleton from "../../public/ic_profile_skeleton.webp";

type ProfileCardProps = {
  profileData: ProfileCardData;
  profileImage: string | null;
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

export default function ProfileCard({ profileData, profileImage }: ProfileCardProps) {
  return (
    <div className="mt-32 flex h-[670px] w-80 flex-col items-center gap-14 rounded-xl border-none px-4 shadow-lg shadow-gray-300">
      <Image className="mt-14 h-[200px] w-[200px] rounded-full object-cover" src={profileImage || ic_profile_skeleton} width={200} height={200} alt="프로필이미지" />
      <div className="grid h-6 w-60 grid-cols-[75px_auto] gap-4">
        {Object.entries(profileData).map(([key, value]) => (
          <>
            <span className="text-sm text-gray-400">{labels[key as keyof ProfileCardData]}</span>
            <span className="text-sm text-gray-800">{value}</span>
          </>
        ))}
      </div>
    </div>
  );
}
