import ic_profile_skeleton from "@/public/ic_profile_skeleton.webp";
// import { ProfileCardData } from "@/src/types/ProfileResponse";
import { TextInput } from "@mantine/core";
import Image from "next/image";

export default function ProfileCardEditor() {
  return (
    <section className="flex h-[511px] flex-col items-center gap-6 rounded-xl border-none px-[34px] py-5 shadow-md shadow-gray-200">
      <Image className="size-[62px] rounded-full object-cover md:size-[71px] xl:m-[30px] xl:size-[200px]" src={ic_profile_skeleton} alt="프로필이미지" />
      <div className="flex flex-col gap-2 truncate transition-all duration-300 ease-in-out xl:h-[304px] xl:gap-4">
        <form className="flex items-center gap-5">
          {/* todo 프로필카드 초기데이터 prop 설정 후 map 함수 사용해서 렌더링 */}
          <div className="w-[60px] text-12 text-gray-400 md:text-14">이름</div>
          <TextInput
            placeholder="정보를 입력 해주세요"
            styles={(theme) => ({
              input: {
                minWidth: "200px",
                fontSize: "12px",
                height: "34px",
                borderRadius: "10px",
                backgroundColor: theme.colors.gray[0],
                "--input-bd-focus": theme.colors.green[1],
                "--input-placeholder-color": theme.colors.gray[2],
              },
            })}
            variant="filled"
          />
        </form>
      </div>
    </section>
  );
}
