import { z } from "zod";
import { signUpSchema, baseSchema } from "@/src/schema/userFormSchema";

export type SignUpFormData = z.infer<typeof signUpSchema>;

export type LoginFormData = Pick<z.infer<typeof baseSchema>, "email" | "password">;
