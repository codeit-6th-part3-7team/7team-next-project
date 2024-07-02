import EditorMenu from "@/src/components/EditorMenu";
import WikiEditor from "@/src/components/WikiEditor";
import { EditorProvider } from "@tiptap/react";

// todo 텍스트 에디터 테스트용, 추후 위키리스트로 리디렉션 설정 예정
export default function Wiki() {
  return (
    <div className="m-5">
      <div className="flex flex-col gap-4">
        <WikiEditor />
      </div>
    </div>
  );
}
