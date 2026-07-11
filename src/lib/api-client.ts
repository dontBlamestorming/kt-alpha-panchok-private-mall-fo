const WAS_BASE_URL = process.env.NEXT_PUBLIC_WAS_BASE_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// axios 없이 fetch만 사용한다 (문서 8번 섹션 참고).
// 토큰 자동 갱신 등 인터셉터 로직은 인증 플로우 구현 시점에 이 래퍼에 추가한다.
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${WAS_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(`Request failed: ${path}`, res.status);
  }

  return res.json() as Promise<T>;
}
