import axios, { isAxiosError } from "@/apis/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Group, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { baseSchema } from "@/schema/signup";
import { LoginFormData } from "@/types/type";

const loginSchema = baseSchema.pick({ email: true, password: true });

export default function LogIn() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("auth/signIn", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        router.push("/");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        // eslint-disable-next-line no-alert
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        // eslint-disable-next-line no-console
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const getClassName = (fieldName: keyof LoginFormData) => {
    if (errors[fieldName]) {
      return "border border-red-500";
    }
    if (touchedFields[fieldName]) {
      return "border border-green-300";
    }
    return "";
  };

  return (
    <Container className="mt-[100px] flex flex-col items-center">
      <Title className="mb-[32px] text-[24px] font-semibold leading-[32px] text-gray-500">회원가입</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[400px] flex-col gap-[24px]">
        <Group>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                label="이메일"
                id="email"
                placeholder="이메일을 입력해주세요"
                error={errors.email && <Text className="text-14 font-normal leading-[18px] text-red-500">{errors.email.message}</Text>}
                classNames={{ input: `h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("email")}` }}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              />
            )}
          />
        </Group>
        <Group>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                type="password"
                label="비밀번호"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                error={errors.password && <Text className="text-14 font-normal leading-[18px] text-red-500">{errors.password.message}</Text>}
                classNames={{ input: `h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("password")}` }}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              />
            )}
          />
        </Group>
        <Button type="submit" disabled={!isValid} className="h-[45px] w-full rounded-[10px] bg-green-200 text-[14px] font-semibold leading-[24px] text-white hover:bg-green-300 disabled:bg-gray-300">
          로그인
        </Button>
        <Group className="flex justify-center gap-[10px] text-[14px] font-normal leading-[24px] text-gray-400">
          <Link href="/signup" className="text-green-200">
            회원가입
          </Link>
        </Group>
      </form>
    </Container>
  );
}
