import axios from "@/apis/axios";
import { error } from "console";

type AuthEditRequestBody = {
  securityAnswer: string;
};

type AuthEditResponseBody = {
  registeredAt: string;
  userId: number;
};

type checkWikiStatusResponseBody = {
  registeredAt: string;
  userId: number;
};

export default async function authEditWiki(answer: string, wikiCode: string): Promise<AuthEditResponseBody> {
  try {
    const checkStatus = await axios.get<checkWikiStatusResponseBody>(`profiles/${wikiCode}/ping`);
    if (checkStatus.data === null) {
      const requestBody: AuthEditRequestBody = {
        securityAnswer: answer,
      };
      const response = await axios.post<AuthEditResponseBody>(`profiles/${wikiCode}/ping`, requestBody);
      return response?.data;
    } else {
      throw new Error("Wiki is currently being edited");
    }
  } catch (e) {
    throw new Error("Auth failed");
  }
}
