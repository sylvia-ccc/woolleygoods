import Image from "next/image";
import Link from "next/link";
import { siteConfig, type Locale } from "./catalog";
import { MobileMenu } from "./mobile-menu";

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
  const isCurrent = (href: string) =>
    currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {isEnglish ? "Skip to content" : "跳转到正文"}
      </a>
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
        <Link
          href={homeHref}
          aria-current={isCurrent(homeHref) ? "page" : undefined}
        >
          {isEnglish ? "Home" : "首页"}
        </Link>
        <Link
          href={productsHref}
          aria-current={isCurrent(productsHref) ? "page" : undefined}
        >
          {isEnglish ? "Products" : "产品"}
        </Link>
        <Link
          href={aboutHref}
          aria-current={isCurrent(aboutHref) ? "page" : undefined}
        >
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
      <MobileMenu
        locale={locale}
        currentPath={currentPath}
        homeHref={homeHref}
        productsHref={productsHref}
        aboutHref={aboutHref}
      />
    </>
  );
}

type SiteFooterProps = {
  locale?: Locale;
};

export function SiteFooter({ locale = "zh" }: SiteFooterProps) {
  const isEnglish = locale === "en";

  return (
    <footer>
      <div className="footer-brand">
        <Link
          className="wordmark footer-wordmark"
          href={isEnglish ? "/en" : "/"}
          aria-label={
            isEnglish ? "Return to Woolley home" : "返回 Woolley 首页"
          }
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
        <p className="footer-tagline">FUN AND MATURE!!</p>
        <p className="footer-caption">
          {isEnglish
            ? "Warm technology, made playful."
            : "温暖科技，把成熟生活重新玩出趣味。"}
        </p>
      </div>
      <nav
        className="footer-nav"
        aria-label={isEnglish ? "Footer navigation" : "页脚导航"}
      >
        <p className="section-kicker">{isEnglish ? "EXPLORE" : "探索"}</p>
        <Link href={isEnglish ? "/en" : "/"}>
          {isEnglish ? "Home" : "首页"}
        </Link>
        <Link href={isEnglish ? "/en/products" : "/products"}>
          {isEnglish ? "Products" : "产品"}
        </Link>
        <Link href={isEnglish ? "/en/about" : "/about"}>
          {isEnglish ? "Brand" : "品牌"}
        </Link>
      </nav>
      <div className="footer-meta">
        <p>{isEnglish ? siteConfig.companyEn : siteConfig.company}</p>
        <p>SHENZHEN · EST. {siteConfig.founded}</p>
        <p>© 2026 WOOLLEY</p>
      </div>
    </footer>
  );
}
