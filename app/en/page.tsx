import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  title: { absolute: "Woolleygoods｜Warm Technology, Made Playful" },
  description:
    "Woolley creates warm technology through tech toys, fashion accessories, interactive plush, and AI companions.",
  alternates: {
    canonical: "/en",
    languages: { "zh-CN": "/", en: "/en" },
  },
};

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
