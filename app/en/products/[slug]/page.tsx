import type { Metadata } from "next";
import {
  generateProductMetadata,
  generateProductStaticParams,
  ProductDetail,
  type ProductRouteProps,
} from "../../../product-detail-page";

export const generateStaticParams = generateProductStaticParams;

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return generateProductMetadata(slug, "en");
}

export default async function EnglishProductPage({
  params,
}: ProductRouteProps) {
  const { slug } = await params;
  return <ProductDetail slug={slug} locale="en" />;
}
