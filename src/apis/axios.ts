import axios from "axios";

const myToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMxLCJ0ZWFtSWQiOiI2LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcxOTgwOTMwNCwiZXhwIjoxNzE5ODExMTA0LCJpc3MiOiJzcC13aWtpZWQifQ.TTNgBqLNTEXC24xtD9dKM5DLQV9K1DqK0-QJoaD90c0";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

// note 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
      return newConfig;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// note refreshToken 관련 변수
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

// note 토큰 갱신 요청 함수
const postRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");
  const response = await instance.post("auth/refresh-token", { refreshToken });
  return response.data;
};

// note 갱신하는 동안 요청 임시저장
const addSubscribers = (newToken: string) => {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
};

// note 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.retryAttempt) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newTokens = await postRefreshToken();
          localStorage.setItem("accessToken", newTokens.accessToken);
          localStorage.setItem("refreshToken", newTokens.refreshToken);
          instance.defaults.headers.common.Authorization = `Bearer ${newTokens.accessToken}`;
          addSubscribers(newTokens.accessToken);
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return await Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribers.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
export { isAxiosError } from "axios";
