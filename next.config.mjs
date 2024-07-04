/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: next.config.js 파일에 images 설정을 추가하여 외부 이미지를 허용하는 방법
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/Wikied/**",
      },
    ],
  },
};

export default nextConfig;
