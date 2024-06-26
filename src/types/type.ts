import { z } from "zod";
import schema from "@/schema/signup";

export type SignUpFormData = z.infer<typeof schema>;

export type LoginFormData = Pick<SignUpFormData, "email" | "password">;
