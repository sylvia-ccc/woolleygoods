import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductCopy,
  productPageMap,
  productPages,
  type Locale,
} from "./catalog";
import { SiteFooter, SiteHeader } from "./site-chrome";

export type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateProductStaticParams() {
  return productPages.map((product) => ({ slug: product.slug }));
}

export function generateProductMetadata(
  slug: string,
  locale: Locale,
): Metadata {
  const product = productPageMap.get(slug);

  if (!product) {
    return { title: locale === "en" ? "Product not found" : "产品未找到" };
  }

  const copy = getProductCopy(product, locale);
  const canonical =
    locale === "en"
      ? `/en/products/${product.slug}`
      : `/products/${product.slug}`;

  return {
    title: `${copy.name}｜${copy.secondaryName}`,
    description: `${copy.tagline} ${copy.intro}`,
    alternates: {
      canonical,
      languages: {
        "zh-CN": `/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
      },
    },
    openGraph: {
      title: copy.name,
      description: copy.tagline,
      images: [{ url: product.hero, alt: copy.name }],
      type: "website",
    },
  };
}

type ProductDetailProps = {
  slug: string;
  locale: Locale;
};

export function ProductDetail({ slug, locale }: ProductDetailProps) {
  const product = productPageMap.get(slug);

  if (!product) {
    notFound();
  }

  const isEnglish = locale === "en";
  const basePath = isEnglish ? "/en" : "";
  const copy = getProductCopy(product, locale);
  const currentIndex = productPages.findIndex((item) => item.slug === slug);
  const previousProduct =
    productPages[(currentIndex - 1 + productPages.length) % productPages.length];
  const nextProduct = productPages[(currentIndex + 1) % productPages.length];
  const previousCopy = getProductCopy(previousProduct, locale);
  const nextCopy = getProductCopy(nextProduct, locale);

  return (
    <main
      className={`product-page product-theme-${product.theme} ${isEnglish ? "lang-en" : ""}`}
      lang={isEnglish ? "en" : "zh-CN"}
    >
      <SiteHeader
        locale={locale}
        currentPath={`/products/${product.slug}`}
        ctaHref={`${basePath}/products`}
        ctaLabel="ALL PRODUCTS"
      />

      <article>
        <section className="product-detail-hero">
          <div className="product-detail-copy">
            <p className="section-kicker">
              WOOLLEY · {product.categoryEn} / {product.index}
            </p>
            {product.code ? (
              <p className="product-detail-code">{product.code}</p>
            ) : null}
            <h1>{copy.name}</h1>
            <p className="product-detail-name-en">{copy.secondaryName}</p>
            <p className="product-detail-tagline">{copy.tagline}</p>
            <a className="button button-dark" href="#story">
              {isEnglish ? "View product" : "查看产品"}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="product-detail-visual">
            <span className="product-detail-index" aria-hidden="true">
              {product.index}
            </span>
            <div className="product-detail-hero-image">
              <Image
                src={product.hero}
                alt={isEnglish ? `${copy.name} hero view` : `${copy.name}主视觉`}
                fill
                priority
                unoptimized
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: product.heroFit ?? "cover" }}
              />
            </div>
          </div>
        </section>

        <section className="product-detail-story" id="story">
          <div>
            <p className="section-kicker">PRODUCT STORY</p>
            <h2>{copy.tagline}</h2>
          </div>
          <div className="product-detail-story-copy">
            <p>{copy.intro}</p>
            <dl>
              {copy.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
            {copy.note ? (
              <p className="product-detail-note">{copy.note}</p>
            ) : null}
          </div>
        </section>

        <section
          className="product-detail-gallery"
          aria-labelledby="gallery-title"
        >
          <div className="product-detail-section-heading">
            <p className="section-kicker">SELECTED DETAILS</p>
            <div>
              <h2 id="gallery-title">
                {isEnglish ? "Come closer. See every detail." : "靠近一点，看见细节。"}
              </h2>
              <p className="product-detail-gallery-hint">
                {String(copy.gallery.length).padStart(2, "0")} DETAILS · {" "}
                {isEnglish ? "SWIPE TO EXPLORE" : "横向滑动查看"}{" "}
                <span aria-hidden="true">→</span>
              </p>
            </div>
          </div>
          <div className="product-detail-gallery-grid">
            {copy.gallery.map((item, index) => (
              <figure
                className={
                  index === 0 ? "product-detail-gallery-featured" : undefined
                }
                key={item.src}
              >
                <div className="product-detail-gallery-image">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    sizes={
                      index === 0
                        ? "(max-width: 820px) 100vw, 64vw"
                        : "(max-width: 820px) 100vw, 32vw"
                    }
                    style={{ objectFit: item.fit ?? "cover" }}
                  />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {product.film ? (
          <section className="product-detail-film" aria-labelledby="film-title">
            <div>
              <p className="section-kicker">PRODUCT FILM</p>
              <h2 id="film-title">
                {isEnglish
                  ? "A moment when good luck arrives."
                  : "好运抵达的片刻。"}
              </h2>
            </div>
            <video controls playsInline preload="metadata" poster={product.hero}>
              <source src={product.film} type="video/mp4" />
              {isEnglish
                ? "Your browser does not support video playback."
                : "你的浏览器暂不支持视频播放。"}
            </video>
          </section>
        ) : null}

        <nav
          className="product-pagination"
          aria-label={isEnglish ? "Browse other products" : "浏览其他产品"}
        >
          <div className="product-pagination-status">
            <p>
              PRODUCT {String(currentIndex + 1).padStart(2, "0")} / {" "}
              {String(productPages.length).padStart(2, "0")}
            </p>
            <Link href={`${basePath}/products`}>
              {isEnglish ? "View all products" : "查看全部产品"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="product-pagination-grid">
            <Link
              className="product-pagination-card product-pagination-previous"
              href={`${basePath}/products/${previousProduct.slug}`}
            >
              <span className="product-pagination-image">
                <Image
                  src={previousProduct.hero}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 820px) 50vw, 24vw"
                  style={{ objectFit: previousProduct.heroFit ?? "cover" }}
                />
              </span>
              <span className="product-pagination-copy">
                <small>← PREVIOUS · {previousProduct.index}</small>
                <strong>{previousCopy.name}</strong>
              </span>
            </Link>

            <Link
              className="product-pagination-card product-pagination-next"
              href={`${basePath}/products/${nextProduct.slug}`}
            >
              <span className="product-pagination-image">
                <Image
                  src={nextProduct.hero}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 820px) 50vw, 24vw"
                  style={{ objectFit: nextProduct.heroFit ?? "cover" }}
                />
              </span>
              <span className="product-pagination-copy">
                <small>NEXT · {nextProduct.index} →</small>
                <strong>{nextCopy.name}</strong>
              </span>
            </Link>
          </div>
        </nav>
      </article>

      <SiteFooter locale={locale} />
    </main>
  );
}
