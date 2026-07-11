import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { MswProvider } from "@/components/providers/msw-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "임직원 폐쇄몰",
  description: "고객사 임직원 전용 폐쇄몰",
};

// TODO: 서브도메인(tenant) 브랜딩 CSS 변수 SSR 주입
// middleware가 넣어준 x-tenant-slug 헤더로 WAS 브랜딩 API를 조회해
// <html style={{ "--brand-primary": ... }}> 형태로 주입한다.
// WAS 브랜딩 API가 아직 없어 다음 세션에서 구현한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <MswProvider>{children}</MswProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
