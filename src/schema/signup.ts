import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .min(2, "이름을 입력해주세요")
    .max(10, "10자 이하로 작성해주세요")
    .regex(/^[^\d!@#$%^&*(),.?":{}|<>]*$/, "이름에 숫자나 특수문자가 포함될 수 없습니다."),
  email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
  passwordConfirmation: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요."),
});

const signUpSchema = baseSchema.refine((data) => data.password === data.passwordConfirmation, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordConfirmation"],
});

export { signUpSchema, baseSchema };
