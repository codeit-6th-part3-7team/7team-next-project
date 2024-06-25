import { Button, InputPlaceholder, Modal, TextInput } from "@mantine/core";
import Image from "next/image";
import ic_lock from "../../public/ic_lock.webp";
import theme from "@/styles/theme";

type EditWikiAuthModal = {
  securityQuestion: string;
  opened: boolean;
  onClose: () => void;
};

export default function EditWikiAuthModal({ securityQuestion, opened, onClose }: EditWikiAuthModal) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        size="sm"
        centered={true}
        padding={20}
        radius={10}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "fade", duration: 300, timingFunction: "linear" }}
      >
        <div className="flex flex-col items-center gap-4 mb-4">
          <Image className="mx-auto" src={ic_lock} alt="위키수정권한확인" width={42} height={42} />
          <span className="text-sm text-center font-normal text-gray-400">
            다음 퀴즈를 맞추고
            <br />
            위키를 작성해 보세요
          </span>
        </div>
        <div className="flex flex-col gap-6">
          {/* todo form component */}
          <TextInput
            label={securityQuestion}
            data-autofocus
            placeholder="답변을 입력해 주세요"
            styles={(theme) => ({
              label: {
                fontSize: 18,
                fontWeight: 600,
                color: theme.colors.gray[5],
                marginBottom: 10,
                marginLeft: 3,
              },
              input: {
                height: 45,
                "::placeholder": {
                  fontSize: 14,
                  fontWeight: 400,
                  color: theme.colors.gray[3],
                },
                // todo input스타일 속성 수정할 방법 찾아보기
              },
            })}
          />
          <Button size="md" color="green.1">
            확인
          </Button>
        </div>
        <div className="leading-tight text-xs font-normal text-gray-400 flex flex-col items-center gap-1 mt-6">
          <span>위키드는 지인들과 함께하는 즐거운 공간입니다</span>
          <span>지인에게 상처를 주지 않도록 작성해 주세요</span>
        </div>
      </Modal>
    </>
  );
}
