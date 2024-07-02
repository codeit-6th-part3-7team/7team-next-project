import ProfileCardEditor from "@/src/components/ProfileCardEditor";
import WikiEditor from "@/src/components/WikiEditor";

// todo 텍스트 에디터 테스트용, 추후 위키리스트로 리디렉션 설정 예정
export default function Wiki() {
  return (
    <div className="m-3">
      <ProfileCardEditor />
      <div className="mt-3 flex flex-col gap-4">
        <WikiEditor />P
      </div>
    </div>
  );
}
