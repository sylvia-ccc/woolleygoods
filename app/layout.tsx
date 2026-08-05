import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Woolley｜Fun and Nature",
    template: "%s｜Woolley",
  },
  description:
    "Woolley 乌哩文化创意——趣调成熟，以温暖科技打造科技潮玩、潮流配饰、交互毛绒与 AI 陪伴产品。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
