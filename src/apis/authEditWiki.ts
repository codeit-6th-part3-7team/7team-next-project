import axiosInstance from "@/apis/axios";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

type AuthEditRequestBody = {
  securityAnswer: string;
};

type AuthEditResponseBody = {
  registeredAt: string;
  userId: number;
};

export default async function authEditWiki(answer: string, wikiCode: string): Promise<AuthEditResponseBody | null> {
  try {
    const requestBody: AuthEditRequestBody = {
      securityAnswer: answer,
    };
    const response = await axiosInstance.post<AuthEditResponseBody>(`profiles/${wikiCode}/ping`, requestBody);

    if (response.status === 200) {
      return response.data;
    } else {
      notifications.show({
        title: "오류",
        message: `${response.status} 오류가 발생했습니다`,
        color: "red",
      });
      return null;
    }
  } catch (error) {
    throw error;
  }
}
