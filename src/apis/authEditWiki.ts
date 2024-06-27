import axios from "@/apis/axios";
import { error } from "console";

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
    return response?.data;
  } catch (e) {
    throw new Error("Auth failed");
  }
}
