import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextInput, PasswordInput, Button, Title, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "@/src/types/userFormData";
import { signUpSchema } from "@/src/schema/userFormSchema";
import axios, { isAxiosError } from "@/src/apis/axios";

const showNotification = (title: string, message: string, color: string) => {
  notifications.show({
    color,
    title,
    message,
    autoClose: 2000,
    withCloseButton: true,
    styles: () => ({
      root: {
        backgroundColor: color,
        width: 400,
        borderRadius: 10,
        padding: 25,
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
      },
      title: { color: "white" },
      description: { color: "white" },
      closeButton: { color: "white", width: 50, height: 50, position: "absolute", top: 20, right: 0 },
    }),
  });
};

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("auth/signUp", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      showNotification("회원가입 성공!", "가입이 완료되었습니다! 😊", "#32A68A");
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          showNotification("회원가입 실패!", "이미 존재하는 이메일입니다! 🤥", "#D14343");
        } else {
          showNotification("회원가입 실패!", `오류가 발생했습니다: ${error.response?.data.message || "알 수 없는 오류"}`, "#D14343");
        }
      } else {
        showNotification("회원가입 실패!", "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥", "#D14343");
      }
    }
  };

  const getInputStyles = (fieldName: keyof SignUpFormData) => {
    const key = fieldName as string;
    if (errors[fieldName]) {
      return {
        borderColor: "#D14343",
        backgroundColor: "#ffcdd2",
      };
    }
    if (touchedFields[key]) {
      return {
        borderColor: "#4CBFA4",
        backgroundColor: "#EEF9F6",
      };
    }
    return {};
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
  }, [router]);

  const labelStyles = {
    fontSize: 14,
    fontWeight: 400,
    color: "#8F95B2",
    marginBottom: 10,
  };

  const inputStyles = {
    height: "45px",
    borderRadius: "10px",
    padding: "10px 20px",
    marginBottom: 10,
    backgroundColor: "#F7F7FA",
  };

  return (
    <div className="mt-[100px] flex flex-col items-center">
      <Title order={1} mb={32} size={24} c="gray.4">
        회원가입
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className="my-0 flex w-[335px] flex-col gap-[24px] md:w-[400px]">
        <TextInput
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          styles={(theme) => ({
            label: {
              ...labelStyles,
            },
            input: {
              ...inputStyles,
              ...getInputStyles("name"),
            },
            placeholder: {
              color: theme.colors.gray[4],
            },
          })}
          error={errors.name?.message}
          required
          variant="filled"
        />
        <TextInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          styles={() => ({
            label: {
              ...labelStyles,
            },
            input: {
              ...inputStyles,
              ...getInputStyles("email"),
            },
            // placeholder: {
            //   color: errors.password ? "red" : undefined,
            // },
          })}
          error={errors.email?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
          styles={() => ({
            label: {
              ...labelStyles,
            },
            input: {
              ...inputStyles,
              ...getInputStyles("password"),
            },
            // placeholder: {
            //   color: errors.password ? "red" : undefined,
            // },
          })}
          error={errors.password?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordConfirmation")}
          styles={() => ({
            label: {
              ...labelStyles,
            },
            input: {
              ...inputStyles,
              ...getInputStyles("passwordConfirmation"),
              "&:focus-within": {
                borderColor: "green",
              },
            },
            placeholder: {
              color: errors.passwordConfirmation ? "red" : undefined,
            },
          })}
          error={errors.passwordConfirmation?.message}
          required
          variant="filled"
        />
        <Button type="submit" disabled={!isValid} fullWidth mt={16} size="md" color="green.1" radius="md" c="white">
          가입하기
        </Button>
        <Flex justify="center" gap={10} mt={10}>
          <Text size="sm" c="gray.3">
            이미 회원이신가요?
          </Text>
          <Link href="/login" passHref>
            <Text size="sm" c="green.1" style={{ cursor: "pointer" }}>
              로그인하기
            </Text>
          </Link>
        </Flex>
      </form>
    </div>
  );
}
