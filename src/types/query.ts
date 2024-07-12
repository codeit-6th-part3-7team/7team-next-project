import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type MutationOptions<TReq = unknown, TRes = unknown> = Omit<UseMutationOptions<TRes, AxiosError, TReq>, "mutationKey" | "mutationFn">;

export type QueryOptions<TRes = unknown, TQueryKey = string> = Omit<UseQueryOptions<TRes, AxiosError, TRes, TQueryKey[]>, "queryKey" | "queryFn" | "refetchInterval" | "initialData">;
