import axios, { isAxiosError } from "@/apis/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(2, "이름을 입력해주세요")
      .max(10, "10자 이하로 작성해주세요")
      .regex(/^[^\d!@#$%^&*(),.?":{}|<>]*$/, "이름에 숫자나 특수문자가 포함될 수 없습니다."),
    email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
    passwordConfirmation: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("auth/signUp", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      // TODO: 테스트용 alert. 추후 mantine ui로 변경 예정
      // eslint-disable-next-line no-alert
      alert("가입이 완료되었습니다");
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          // TODO: 테스트용 alert. 추후 mantine ui로 변경 예정
          // eslint-disable-next-line no-alert
          alert("이미 존재하는 이메일입니다");
        } else {
          // TODO: 테스트용 alert. 추후 mantine ui로 변경 예정
          // eslint-disable-next-line no-alert
          alert(`오류가 발생했습니다: ${error.response?.data.message || "알 수 없는 오류"}`);
        }
      } else {
        // TODO: 테스트용 alert. 추후 mantine ui로 변경 예정
        // eslint-disable-next-line no-alert
        alert("예기치 않은 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const getClassName = (fieldName: keyof FormData) => {
    if (errors[fieldName]) {
      return "border border-red-500";
    }
    if (touchedFields[fieldName]) {
      return "border border-green-300";
    }
    return "";
  };

  return (
    <div className="mt-[100px] flex flex-col items-center">
      <h1 className="mb-[32px] text-[24px] font-semibold leading-[32px] text-gray-500">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-[400px] flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="name" className="text-[14px] font-normal leading-[32px] text-gray-500">
            이름
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="이름을 입력해주세요"
            className={`h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("name")}`}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-[14px] font-normal leading-[32px] text-gray-500">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
            className={`h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("email")}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="password" className="text-[14px] font-normal leading-[32px] text-gray-500">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password")}
            className={`h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("password")}`}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="passwordConfirmation" className="text-[14px] font-normal leading-[32px] text-gray-500">
            비밀번호 확인
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("passwordConfirmation")}
            className={`h-[45px] w-full rounded-[10px] bg-gray-100 py-[10px] pl-[20px] outline-none ${getClassName("passwordConfirmation")}`}
          />
          {errors.passwordConfirmation && <p className="error-message">{errors.passwordConfirmation.message}</p>}
        </div>

        <button type="submit" disabled={!isValid} className="h-[45px] w-full rounded-[10px] bg-green-200 text-[14px] font-semibold leading-[24px] text-white hover:bg-green-300 disabled:bg-gray-300">
          가입하기
        </button>
        <div className="flex justify-center gap-[10px] text-[14px] font-normal leading-[24px] text-gray-400">
          <p>이미 회원이신가요?</p>
          <Link href="/login" className="text-green-200">
            로그인하기
          </Link>
        </div>
      </form>
      <style jsx>{`
        .error-message {
          color: red;
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
        }
      `}</style>
    </div>
  );
}
