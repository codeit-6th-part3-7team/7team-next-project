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
    <section
      className={`flex flex-col rounded-xl border-none px-5 md:px-6 py-3 md:px-5 shadow-lg shadow-gray-300 transition-all duration-300 ease-in-out 
      ${isProfileOpen ? "h-[260px] md:h-[285px]" : "h-[126px] md:h-[130px]"}`}
    >
      <article className="flex-grow flex justify-start gap-5 md:gap-8">
        <Image className="w-[62px] md:w-[71px] h-[62px] md:h-[71px] rounded-full object-cover" src={profileImage || ic_profile_skeleton} alt="프로필이미지" />
        <div
          className={`flex flex-col gap-2 truncate transition-all duration-300 ease-in-out
        ${isProfileOpen ? "h-[205px] md:h-[234px]" : "h-[70px] md:h-[80px]"}`}
        >
          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="flex gap-5">
              <div className="w-20 text-12 md:text-14 text-gray-400">{labels[key as keyof ProfileCardData]}</div>
              <div className="min-w-40 truncate text-12 md:text-14 text-gray-800">{value}</div>
            </div>
          ))}
        </div>
      </article>
      <button className="mx-auto" type="button" onClick={toggleProfile}>
        <Image
          src={ic_chevron}
          className={`h-6 w-6 transform transition-transform duration-300 ease-in-out ${isProfileOpen ? "rotate-180" : ""}`}
          alt={`${isProfileOpen ? "프로필 상세 닫기" : "프로필 상세 보기"}`}
        />
      </button>
    </section>
  );
}
