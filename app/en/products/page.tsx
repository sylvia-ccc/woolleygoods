import type { Metadata } from "next";
import HomePage from "../../home-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Woolley tech toys, fashion accessories, interactive plush, and AI companions.",
  alternates: {
    canonical: "/en/products",
    languages: { "zh-CN": "/products", en: "/en/products" },
  },
};

export default function EnglishProductsPage() {
  return <HomePage locale="en" page="products" />;
}
