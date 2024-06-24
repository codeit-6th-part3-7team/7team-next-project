import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

const schema = z
  .object({
    name: z
      .string()
      .min(2, "이름을 입력해주세요")
      .max(10, "10자 이하로 작성해주세요")
      .regex(/^[^\d!@#$%^&*(),.?":{}|<>]*$/, "이름에 숫자나 특수문자가 포함될 수 없습니다."),
    email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
    confirmPassword: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = () => {};

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
    <div className="flex flex-col items-center mt-[100px]">
      <h1 className="text-[24px] leading-[32px] font-semibold text-gray-500 mb-[32px]">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="name" className="text-[14px] leading-[32px] font-normal text-gray-500">
            이름
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="이름을 입력해주세요"
            className={`w-full h-[45px] rounded-[10px] py-[10px] pl-[20px] outline-none bg-gray-100 ${getClassName("name")}`}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email" className="text-[14px] leading-[32px] font-normal text-gray-500">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
            className={`w-full h-[45px] rounded-[10px] py-[10px] pl-[20px] outline-none bg-gray-100 ${getClassName("email")}`}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="password" className="text-[14px] leading-[32px] font-normal text-gray-500">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password")}
            className={`w-full h-[45px] rounded-[10px] py-[10px] pl-[20px] outline-none bg-gray-100 ${getClassName("password")}`}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="confirmPassword" className="text-[14px] leading-[32px] font-normal text-gray-500">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("confirmPassword")}
            className={`w-full h-[45px] rounded-[10px] py-[10px] pl-[20px] outline-none bg-gray-100 ${getClassName("confirmPassword")}`}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={!isValid} className="w-full h-[45px] bg-green-200 rounded-[10px] hover:bg-green-300 disabled:bg-gray-300 text-[14px] font-semibold leading-[24px] text-white">
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
