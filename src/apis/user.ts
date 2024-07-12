import { ChangePasswordRequestType, GetMeResponseType } from "../schema/user";
import instance from "./axios";

export const getMe = async (): Promise<GetMeResponseType> => {
  const response = await instance.get("/users/me");
  return response.data;
};

export const changePassword = async (data: ChangePasswordRequestType) => {
  const response = await instance.patch("/users/me/password", data);
  return response.data;
};
