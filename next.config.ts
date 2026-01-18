import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    // Notion 이미지 도메인 허가
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com", // Notion S3 이미지
      },
      {
        protocol: "https",
        hostname: "**.notion.so", // Notion 직접 호스팅 이미지
      },
    ],
    // 이미지 캐싱 최적화
    unoptimized: false,
  },
};

export default nextConfig;
