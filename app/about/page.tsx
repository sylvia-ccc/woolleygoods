import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  title: "关于 Woolley",
  description:
    "认识 Woolley 乌哩文化创意，以及趣调成熟、温暖科技的品牌理念。",
  alternates: {
    canonical: "/about",
    languages: { "zh-CN": "/about", en: "/en/about" },
  },
};

export default function AboutPage() {
  return <HomePage page="about" />;
}
