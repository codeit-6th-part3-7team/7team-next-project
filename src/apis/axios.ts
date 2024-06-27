import axios from "axios";

const token = "토큰을 입력하세용";
const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/6-7",
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
