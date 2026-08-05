import type { Metadata } from "next";
import HomePage from "../../home-page";

export const metadata: Metadata = {
  title: "About Woolley",
  description:
    "Meet Woolley and discover our Fun and Mature approach to warm technology and playful everyday objects.",
  alternates: {
    canonical: "/en/about",
    languages: { "zh-CN": "/about", en: "/en/about" },
  },
};

export default function EnglishAboutPage() {
  return <HomePage locale="en" page="about" />;
}
