import axios, { isAxiosError } from "@/src/apis/axios";
import { loginSchema } from "@/src/schema/userFormSchema";
import { LoginFormData } from "@/src/types/userFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextInput, PasswordInput, Button, Title, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const showNotification = (title: string, message: string, color: string) => {
    notifications.show({
      color,
      title,
      message,
      autoClose: 2000,
      withCloseButton: true,
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("auth/signIn", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          showNotification("로그인 실패!", "이메일 또는 비밀번호가 일치하지 않습니다. 🤥", "red.1");
        } else {
          showNotification("로그인 실패!", `오류가 발생했습니다: ${error.response?.data.message || "알 수 없는 오류"}`, "#red.1");
        }
      } else {
        showNotification("로그인 실패!", "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥", "red.1");
      }
    }
  };

  const getInputStyles = (fieldName: keyof LoginFormData) => {
    if (errors[fieldName]) {
      return {
        borderColor: "#D14343",
        backgroundColor: "#ffcdd2",
        "--input-placeholder-color": "#D14343",
      };
    }
    if (touchedFields[fieldName]) {
      return {
        borderColor: "#4CBFA4",
        backgroundColor: "#EEF9F6",
        "--input-placeholder-color": "#4CBFA4",
      };
    }
    return {
      "--input-placeholder-color": "#8F95B2",
    };
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="mt-[100px] flex flex-col items-center">
      <Title order={1} mb={32} size={24} c="gray.4">
        로그인
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className="my-0 flex w-[335px] flex-col gap-[24px] md:w-[400px]">
        <TextInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("email"),
            },
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
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("password"),
            },
          })}
          error={errors.password?.message}
          required
          variant="filled"
        />
        <Button type="submit" disabled={!isValid} fullWidth mt={16} size="md" color="green.1" radius="md" c="white" className="button">
          로그인
        </Button>
        <Flex justify="center" gap={10} mt={10}>
          <Link href="/signup" passHref>
            <Text size="sm" c="green.1" style={{ cursor: "pointer" }}>
              회원가입
            </Text>
          </Link>
        </Flex>
      </form>
    </div>
  );
}
