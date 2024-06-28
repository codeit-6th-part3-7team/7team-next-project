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

    // note 200 response외의 리스폰스 반환 시 오류 알림
    if (response.status === 200) {
      return response.data;
    } else {
      // note 예상치 못한 상태 코드 확인
      notifications.show({
        title: "오류",
        message: `${response.status} 오류가 발생했습니다`,
        color: "red",
      });
      return null;
    }
    // note 200 제외 400, 500번 대 response 오류 throw 호출자(auth modal)에서 처리
  } catch (error) {
    throw error;
  }
}
