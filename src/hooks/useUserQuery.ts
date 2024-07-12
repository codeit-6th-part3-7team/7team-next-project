import { useMutation, useQuery } from "@tanstack/react-query";
import quries from "../apis/queries";
import { MutationOptions } from "../types/query";
import { ChangePasswordRequestType } from "../schema/user";
import { changePassword } from "../apis/user";

export const useGetMe = () => useQuery(quries.user.getMe());

export const useUpdateMe = (options: MutationOptions) =>
  useMutation({
    mutationFn: (request: ChangePasswordRequestType) => changePassword(request),
    ...options,
    onSuccess: (...arg) => {
      if (options?.onSuccess) {
        options?.onSuccess(...arg);
      }
    },
  });
