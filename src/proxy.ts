import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 서브도메인 기반 멀티테넌시: Host 헤더에서 tenant slug를 추출해
// 하위 Server Component가 읽을 수 있도록 요청 헤더로 전달한다.
// JWT 서명 검증은 여기서 하지 않는다 — WAS가 담당한다.
// 인증 여부에 따른 라우트 가드(redirect)는 로그인 플로우 구현 시점에 이 자리에 추가한다.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const tenantSlug = host.split(".")[0];

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-slug", tenantSlug);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)",
  ],
};
