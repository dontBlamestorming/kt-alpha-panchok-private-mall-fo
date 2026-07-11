import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 컨테이너/쿠버네티스가 아닌 VM 장비에 WAS와 프로세스로 동거 배포한다
  // (Linear 최상위 기획서 5번, private-mall-fo 문서 8번 섹션 참고).
  // 컨테이너 이미지가 아닌 standalone 빌드 산출물을 VM에 직접 배치한다.
  output: "standalone",
};

export default nextConfig;
