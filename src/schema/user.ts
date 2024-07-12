import * as z from "zod";

export const ProfileSchema = z.object({
  code: z.string(),
  id: z.number(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const GetMeResponse = z.object({
  profile: ProfileSchema,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  teamId: z.string(),
  name: z.string(),
  id: z.number(),
});
export type GetMeResponseType = z.infer<typeof GetMeResponse>;

export const changePasswordRequest = z.object({
  passwordConfirmation: z.string(),
  password: z.string(),
  currentPassword: z.string(),
});
export type ChangePasswordRequestType = z.infer<typeof changePasswordRequest>;
