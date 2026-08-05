import Image from "next/image";
import Link from "next/link";
import type { Locale } from "./catalog";

type SiteHeaderProps = {
  locale?: Locale;
  currentPath?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  locale = "zh",
  currentPath = "/",
  ctaHref,
  ctaLabel = "EXPLORE",
}: SiteHeaderProps) {
  const isEnglish = locale === "en";
  const homeHref = isEnglish ? "/en" : "/";
  const productsHref = isEnglish ? "/en/products" : "/products";
  const aboutHref = isEnglish ? "/en/about" : "/about";
  const resolvedCtaHref = ctaHref ?? productsHref;
  const languageHref = isEnglish
    ? currentPath
    : currentPath === "/"
      ? "/en"
      : `/en${currentPath}`;

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={homeHref}
        aria-label={isEnglish ? "Woolley home" : "Woolley 首页"}
      >
        <Image
          src="/brand/woolley-logo.png"
          alt="Woolley"
          fill
          priority
          unoptimized
          sizes="120px"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <nav aria-label={isEnglish ? "Primary navigation" : "主要导航"}>
        <Link href={homeHref}>{isEnglish ? "Home" : "首页"}</Link>
        <Link href={productsHref}>
          {isEnglish ? "Products" : "产品"}
        </Link>
        <Link href={aboutHref}>
          {isEnglish ? "Brand" : "品牌"}
        </Link>
      </nav>
      <div className="site-header-actions">
        <Link
          className="language-link"
          href={languageHref}
          hrefLang={isEnglish ? "zh-CN" : "en"}
          aria-label={isEnglish ? "切换至中文" : "Switch to English"}
        >
          {isEnglish ? "中文" : "EN"}
        </Link>
        <Link className="archive-link" href={resolvedCtaHref}>
          {ctaLabel} <span aria-hidden="true">↘</span>
        </Link>
      </div>
    </header>
  );
}

type SiteFooterProps = {
  locale?: Locale;
};

export function SiteFooter({ locale = "zh" }: SiteFooterProps) {
  const isEnglish = locale === "en";

  return (
    <footer>
      <Link
        className="wordmark footer-wordmark"
        href={isEnglish ? "/en" : "/"}
        aria-label={isEnglish ? "Return to Woolley home" : "返回 Woolley 首页"}
      >
        <Image
          src="/brand/woolley-logo.png"
          alt="Woolley"
          fill
          unoptimized
          sizes="(max-width: 820px) 80vw, 38vw"
          style={{ objectFit: "contain" }}
        />
      </Link>
      <p>FUN AND MATURE!!</p>
      <p>© 2026 WOOLLEY</p>
    </footer>
  );
}
