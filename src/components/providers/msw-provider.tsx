"use client";

import { useEffect, useState } from "react";

// 개발 모드에서만 MSW 워커를 등록한다. worker.start()가 끝나기 전까지는
// children을 렌더링하지 않아 목킹되지 않은 요청이 나가지 않도록 한다.
export function MswProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    import("@/mocks/browser").then(({ worker }) => {
      worker.start({ onUnhandledRequest: "bypass" }).then(() => setIsReady(true));
    });
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
