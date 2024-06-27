import axios from "@/apis/axios";
import { notifications } from "@mantine/notifications";

type AuthEditRequestBody = {
  securityAnswer: string;
};

type AuthEditResponseBody = {
  registeredAt: string;
  userId: number;
};

export default async function authEditWiki(answer: string, wikiCode: string): Promise<AuthEditResponseBody> {
  try {
    const requestBody: AuthEditRequestBody = {
      securityAnswer: answer,
    };
    const response = await axios.post<AuthEditResponseBody>(`profiles/${wikiCode}/ping`, requestBody);

    switch (response.status) {
      case 400:
        notifications.show({
          title: "오류",
          message: "정답이 아닙니다",
          color: "red",
        });
      case 200:
        return response?.data;
      default:
        notifications.show({
          title: "오류",
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요",
          color: "red",
        });
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해 주세요");
    }
  } catch (e) {
    throw e;
  }
}
