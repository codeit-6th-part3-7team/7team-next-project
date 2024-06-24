import Image from "next/image";
import temp from "../../public/img_temp_profile.png";

export default function ProfileCard() {
  return (
    <div className="w-80 h-[670px] rounded-xl shadow-lg shadow-gray-300 flex flex-col items-center gap-14 border-none absolute top-32 right-[3%]">
      <Image className="w-[200px] h-[200px] object-cover rounded-full mt-14" src={temp} width={200} height={200} alt="프로필이미지" />
      {/* Todo 데이터 prop으로 받아서 이미지 파일 src 속성도 변수로 설정 */}
      <div className="w-64 h-72 grid grid-cols-[60px_auto]">
        <span className="text-sm text-gray-400">City</span>
        <span className="text-sm text-gray-800">Seoul</span>
        {/* TODO 데이터 prop으로 받아서 map함수로 렌더링 할 예정 */}
      </div>
    </div>
  );
}
