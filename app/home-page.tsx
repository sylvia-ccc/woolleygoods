import Image from "next/image";
import Link from "next/link";
import {
  brandDirections,
  brandDirectionsEn,
  getProductCopy,
  necklaceProduct,
  plushProduct,
  productPages,
  tarotProduct,
  type Locale,
} from "./catalog";
import { SiteFooter, SiteHeader } from "./site-chrome";

const themeClassNames = {
  plush: "product-family-plush",
  tech: "product-family-tech",
  necklace: "product-family-accessory",
  heart: "product-family-heart-chain",
} as const;

const homeCopy = {
  zh: {
    heroLineOne: "让每一次热爱，",
    heroLineTwo: "都因科技而",
    heroLineThree: "生动鲜活。",
    lead:
      "从科技潮玩、潮流配饰到交互毛绒与 AI 陪伴，Woolley 把温暖科技放进日常，也把成熟生活重新玩出趣味。",
    explore: "发现产品",
    about: "认识 Woolley",
    marquee: "让热爱因科技而鲜活",
    lineupHeading: "用科技，收藏每一种喜欢。",
    productLink: "进入独立页面",
    aboutHeadingOne: "让每一次热爱，",
    aboutHeadingTwo: "都因科技而生动鲜活。",
    aboutIntroOne:
      "深圳乌哩文化创意有限公司，源自海外智能家居品牌 SONOFF 的年轻科技创意团队，于 2025 年创立 Woolley。",
    aboutIntroTwo:
      "品牌主张「趣调成熟」：真正的成熟不意味着放弃趣味，而是以更从容的姿态「玩」出格调。",
    directions: brandDirections,
    directionsLabel: "品牌产品方向",
  },
  en: {
    heroLineOne: "For every passion,",
    heroLineTwo: "technology makes it",
    heroLineThree: "vivid and alive.",
    lead:
      "From tech toys and fashion accessories to interactive plush and AI companions, Woolley brings warm technology into everyday life—making adulthood playful again.",
    explore: "Explore products",
    about: "Meet Woolley",
    marquee: "PASSION, MADE VIVID BY TECHNOLOGY",
    lineupHeading: "Collect every kind of joy through technology.",
    productLink: "View product",
    aboutHeadingOne: "Technology makes every passion",
    aboutHeadingTwo: "vivid and alive.",
    aboutIntroOne:
      "Founded in Shenzhen in 2025, Woolley grew out of the young creative technology team behind global smart-home brand SONOFF.",
    aboutIntroTwo:
      "Our idea is “Fun and Mature”: growing up never means giving up play. It means playing with greater ease, taste, and confidence.",
    directions: brandDirectionsEn,
    directionsLabel: "Woolley product directions",
  },
} as const;

type HomePageProps = {
  locale?: Locale;
  page?: "home" | "products" | "about";
};

export default function HomePage({
  locale = "zh",
  page = "home",
}: HomePageProps) {
  const copy = homeCopy[locale];
  const basePath = locale === "en" ? "/en" : "";
  const currentPath = page === "home" ? "/" : `/${page}`;
  const productsPath = `${basePath}/products`;
  const aboutPath = `${basePath}/about`;
  const ctaHref = page === "products" ? aboutPath : productsPath;
  const ctaLabel = page === "products" ? "OUR BRAND" : "EXPLORE";

  return (
    <main
      className={`home-page page-${page} ${locale === "en" ? "lang-en" : ""}`}
      lang={locale === "en" ? "en" : "zh-CN"}
    >
      <SiteHeader
        locale={locale}
        currentPath={currentPath}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
      />

      {page === "home" ? (
        <>
          <section className="brand-home" id="top">
        <div className="brand-home-copy">
          <p className="section-kicker">WOOLLEY · SHENZHEN · EST. 2025</p>
          <h1>
            <span>{copy.heroLineOne}</span>
            {copy.heroLineTwo}
            <br />
            {copy.heroLineThree}
          </h1>
          <p className="brand-home-lead">{copy.lead}</p>
          <div className="brand-home-actions">
            <Link className="button button-dark" href={productsPath}>
              {copy.explore} <span aria-hidden="true">↓</span>
            </Link>
            <Link className="button button-light" href={aboutPath}>
              {copy.about} <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="brand-home-signoff">FUN AND MATURE!!</p>
        </div>

        <div className="brand-home-stage">
          <div className="brand-stage-orbit" aria-hidden="true" />
          <figure className="brand-stage-card brand-stage-plush">
            <Image
              src={plushProduct.assets.hero}
              alt="抱抱柚子叶交互毛绒"
              fill
              priority
              unoptimized
              sizes="(max-width: 860px) 68vw, 30vw"
            />
          </figure>
          <figure className="brand-stage-card brand-stage-tarot">
            <Image
              src={tarotProduct.assets.hero}
              alt="乌哩掌心塔罗科技潮玩"
              fill
              priority
              unoptimized
              sizes="(max-width: 860px) 34vw, 18vw"
            />
          </figure>
          <figure className="brand-stage-card brand-stage-necklace">
            <Image
              src={necklaceProduct.assets.hero}
              alt="星座塔罗项链"
              fill
              unoptimized
              sizes="(max-width: 860px) 38vw, 19vw"
            />
          </figure>
          <div className="brand-stage-ip">
            <Image
              src="/brand/woolley-working.png"
              alt="Woolley 乌哩角色正在使用电脑"
              fill
              unoptimized
              sizes="180px"
            />
          </div>
          <p className="brand-stage-label" aria-hidden="true">
            WARM TECH / PLAYFUL OBJECTS / DAILY COMPANIONS
          </p>
        </div>
          </section>

          <div className="brand-marquee" aria-hidden="true">
            <span>FUN AND MATURE!!</span>
            <span>{copy.marquee}</span>
            <span>WOOLLEY WORLD</span>
            <span>FUN AND MATURE!!</span>
          </div>
        </>
      ) : null}

      {page === "products" ? (
        <section className="product-lineup" id="products">
        <div className="product-lineup-heading">
          <div>
            <p className="section-kicker">SELECTED PRODUCTS</p>
            <h2>{copy.lineupHeading}</h2>
          </div>
          <p>04 PRODUCTS · INDIVIDUAL STORIES</p>
        </div>
        <div className="product-family-grid">
          {productPages.map((product) => {
            const productCopy = getProductCopy(product, locale);

            return (
              <Link
                className={`product-family-card ${themeClassNames[product.theme]}`}
                href={`${basePath}/products/${product.slug}`}
                key={product.slug}
              >
                <div className="product-family-image">
                  <Image
                    src={product.hero}
                    alt={
                      locale === "en"
                        ? `${productCopy.name} product view`
                        : `${productCopy.name}产品展示`
                    }
                    fill
                    unoptimized
                    sizes="(max-width: 820px) 50vw, 25vw"
                    style={{ objectFit: product.heroFit ?? "cover" }}
                  />
                </div>
                <div className="product-family-info">
                  <p>
                    {product.categoryEn} / {product.index}
                  </p>
                  <h3>{productCopy.name}</h3>
                  <p>{productCopy.secondaryName}</p>
                  <span>
                    {copy.productLink} <b aria-hidden="true">↗</b>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        </section>
      ) : null}

      {page === "about" ? (
        <section className="brand-section home-brand-section" id="about">
        <div className="brand-stamp" aria-hidden="true">
          FUN
          <br />×<br />
          MATURE
        </div>
        <div className="brand-copy">
          <p className="section-kicker">WOOLLEY · EST. 2025 · SHENZHEN</p>
          <h2>
            {copy.aboutHeadingOne}
            <br />
            {copy.aboutHeadingTwo}
          </h2>
          <div className="brand-intro">
            <p>{copy.aboutIntroOne}</p>
            <p>{copy.aboutIntroTwo}</p>
          </div>
        </div>
        <div className="brand-values" aria-label={copy.directionsLabel}>
          {copy.directions.map((direction) => (
            <span key={direction}>{direction}</span>
          ))}
        </div>
        </section>
      ) : null}

      <SiteFooter locale={locale} />
    </main>
  );
}
