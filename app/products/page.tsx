import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  title: "产品系列",
  description:
    "浏览 Woolley 乌哩的科技潮玩、潮流配饰、交互毛绒与 AI 陪伴产品。",
  alternates: {
    canonical: "/products",
    languages: { "zh-CN": "/products", en: "/en/products" },
  },
};

export default function ProductsPage() {
  return <HomePage page="products" />;
}
