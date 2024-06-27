import { Button, Modal, TextInput } from "@mantine/core";
import Image from "next/image";
import ic_lock from "../../public/ic_lock.webp";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import authEditWiki from "@/apis/authEditWiki";

type EditWikiAuthModal = {
  securityQuestion: string;
  opened: boolean;
  closeModal: () => void;
  wikiCode: string;
};

export default function EditWikiAuthModal({ securityQuestion, opened, closeModal, wikiCode }: EditWikiAuthModal) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      securityAnswer: "",
    },
    validate: {
      securityAnswer: (value) => (value.trim().length > 0 ? null : "정확한 답변을 입력해 주세요"),
    },
  });

  const handleSubmitAnswer = async (value: string) => {
    try {
      const res = await authEditWiki(value, wikiCode);
      notifications.show({
        title: "Success",
        message: "인증에 성공했습니다",
        color: "green",
      });
      // todo 인증 성공 시 수정 컴포넌트 렌더링
    } catch (e) {
      notifications.show({
        title: "Failed",
        message: "정답이 아닙니다.",
        color: "red",
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
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
        <form
          className="flex flex-col gap-6"
          onSubmit={form.onSubmit((value) => {
            handleSubmitAnswer(value.securityAnswer);
          })}
        >
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
                border: 0,
                background: theme.colors.gray[0],
                // todo placeholder 스타일 수정 방법 찾아보는중...
              },
            })}
            key={form.key("securityAnswer")}
            {...form.getInputProps("securityAnswer")}
          />
          <Button size="md" color="green.1" type="submit">
            확인
          </Button>
        </form>
        <div className="leading-tight text-xs font-normal text-gray-400 flex flex-col items-center gap-1 mt-6">
          <span>위키드는 지인들과 함께하는 즐거운 공간입니다</span>
          <span>지인에게 상처를 주지 않도록 작성해 주세요</span>
        </div>
      </Modal>
    </>
  );
}
