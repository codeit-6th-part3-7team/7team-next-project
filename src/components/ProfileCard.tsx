import ic_chevron from "@/public/ic_chevron.webp";
import ic_profile_skeleton from "@/public/ic_profile_skeleton.webp";
import { ProfileCardData } from "@/src/types/ProfileResponse";
import Image from "next/image";

type ProfileCardProps = {
  profileData: ProfileCardData;
  profileImage: string | null;
  toggleProfile: () => void;
  isProfileOpen: boolean;
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

export default function ProfileCard({ profileData, profileImage, toggleProfile, isProfileOpen }: ProfileCardProps) {
  return (
    <div
      className={`mt-3 flex w-[355px] flex-col items-center gap-2 rounded-xl border-none px-5 py-4 shadow-lg shadow-gray-300 transition-all duration-300 ease-in-out 
    ${isProfileOpen ? "h-[260px]" : "h-[126px]"}`}
    >
      <div className="w-[315px] flex gap-5">
        <Image className="h-[62px] w-[62px] rounded-full object-cover" src={profileImage || ic_profile_skeleton} width={200} height={200} alt="프로필이미지" />
        <div className={`flex flex-col gap-2 truncate transition-all duration-300 ease-in-out ${isProfileOpen ? "h-[205px]" : "h-[70px]"}`}>
          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="flex gap-5">
              <div className="w-20 text-12 text-gray-400">{labels[key as keyof ProfileCardData]}</div>
              <div className="w-40 truncate text-12 text-gray-800">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={toggleProfile}>
        <Image
          src={ic_chevron}
          className={`h-6 w-6 transform transition-transform duration-300 ease-in-out ${isProfileOpen ? "rotate-180" : ""}`}
          alt={`${isProfileOpen ? "프로필 상세 닫기" : "프로필 상세 보기"}`}
        />
      </button>
    </div>
  );
}
