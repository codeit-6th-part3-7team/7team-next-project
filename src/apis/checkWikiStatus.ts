import axios from "@/apis/axios";
import { notifications } from "@mantine/notifications";

type CheckWikiStatusResponseBody = {
  registeredAt: string;
  userId: number;
};

export default async function checkWikiStatus(wikiCode: string): Promise<CheckWikiStatusResponseBody | null> {
  try {
    const response = await axios.get<CheckWikiStatusResponseBody>(`profiles/${wikiCode}/ping`);

    switch (response.status) {
      case 204:
        return null;
      case 200:
        notifications.show({
          title: "수정 중",
          message: "현재 다른 사용자가 위키를 수정 중 입니다",
          color: "yellow",
        });
        return response.data;
      case 404:
        notifications.show({
          title: "없는 프로필",
          message: "프로필을 찾을 수 없습니다. 새로고침 후 다시 시도해주세요",
          color: "red",
        });
        return response.data;
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
