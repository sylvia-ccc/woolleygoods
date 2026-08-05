import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

let renderCount = 0;

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${renderCount++}`,
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Woolley official website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/i);
  assert.match(
    html,
    /<title>Woolleygoods｜Woolley 乌哩文化创意<\/title>/i,
  );
  assert.match(html, /FUN AND MATURE/);
  assert.match(html, /科技潮玩/);
  assert.match(html, /潮流配饰/);
  assert.match(html, /交互毛绒/);
  assert.match(html, /AI 陪伴/);
  assert.match(html, /让每一次热爱/);
  assert.match(html, /href="\/products"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /brand\/woolley-logo\.png/);
  assert.doesNotMatch(html, /\/_vinext\/image\?/);
  assert.doesNotMatch(html, /id="products"|id="about"/);
  assert.doesNotMatch(html, /href="\/products\/hug-pomelo-leaf"/);
  assert.doesNotMatch(html, /products\/hug-pomelo-leaf\/film\.mp4/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("splits products and brand content into dedicated pages", async () => {
  const productsResponse = await render("/products");
  assert.equal(productsResponse.status, 200);
  const productsHtml = await productsResponse.text();
  assert.match(productsHtml, /id="products"/);
  assert.match(productsHtml, /抱抱柚子叶/);
  assert.match(productsHtml, /乌哩掌心塔罗/);
  assert.match(productsHtml, /星座塔罗项链/);
  assert.match(productsHtml, /乌哩银色桃心挂链/);
  assert.match(productsHtml, /products\/hug-pomelo-leaf/);
  assert.doesNotMatch(productsHtml, /id="about"/);

  const aboutResponse = await render("/about");
  assert.equal(aboutResponse.status, 200);
  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /id="about"/);
  assert.match(aboutHtml, /趣调成熟/);
  assert.match(aboutHtml, /科技潮玩/);
  assert.match(aboutHtml, /潮流配饰/);
  assert.match(aboutHtml, /交互毛绒/);
  assert.match(aboutHtml, /AI 陪伴/);
  assert.doesNotMatch(aboutHtml, /id="products"/);
});

test("server-renders each product on an independent route", async () => {
  const routes = [
    ["/products/hug-pomelo-leaf", "抱抱柚子叶", "30 × 16 cm"],
    ["/products/th-1", "乌哩掌心塔罗", "78 张原创卡牌"],
    [
      "/products/zodiac-tarot-necklace",
      "星座塔罗项链",
      "十二星座",
    ],
    [
      "/products/eb-shake-silver-heart",
      "乌哩银色桃心挂链",
      "26 × 270 mm",
    ],
  ];

  for (const [pathname, productName, productSpec] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(productName), pathname);
    assert.match(html, new RegExp(productSpec), pathname);
    assert.match(html, /PRODUCT STORY/, pathname);
    assert.match(html, /SELECTED DETAILS/, pathname);
    assert.match(html, /PREVIOUS/, pathname);
    assert.match(html, /NEXT/, pathname);
    assert.match(html, /全部产品/, pathname);
    assert.match(html, /href="\/products"/, pathname);
    assert.doesNotMatch(html, /\/_vinext\/image\?/, pathname);
  }
});

test("server-renders the English website and localized product routes", async () => {
  const homeResponse = await render("/en");
  assert.equal(homeResponse.status, 200);

  const homeHtml = await homeResponse.text();
  assert.match(
    homeHtml,
    /<title>Woolleygoods｜Warm Technology, Made Playful<\/title>/i,
  );
  assert.match(homeHtml, /lang="en"/);
  assert.match(homeHtml, /For every passion/);
  assert.match(homeHtml, /Explore products/);
  assert.match(homeHtml, /Meet Woolley/);
  assert.match(homeHtml, /href="\/en\/products"/);
  assert.match(homeHtml, /href="\/en\/about"/);
  assert.doesNotMatch(homeHtml, /en\/products\/hug-pomelo-leaf/);
  assert.doesNotMatch(homeHtml, /\/_vinext\/image\?/);

  const productsResponse = await render("/en/products");
  assert.equal(productsResponse.status, 200);
  const productsHtml = await productsResponse.text();
  assert.match(productsHtml, /Hug Pomelo Leaf/);
  assert.match(productsHtml, /The Universe in a Nutshell/);
  assert.match(productsHtml, /Zodiac Tarot Necklace/);
  assert.match(productsHtml, /Silver Heart Shake Chain/);
  assert.match(productsHtml, /en\/products\/hug-pomelo-leaf/);

  const aboutResponse = await render("/en/about");
  assert.equal(aboutResponse.status, 200);
  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /Fun and Mature/);
  assert.match(aboutHtml, /Tech Toys/);
  assert.match(aboutHtml, /Fashion Accessories/);
  assert.match(aboutHtml, /Interactive Plush/);
  assert.match(aboutHtml, /AI Companions/);

  const routes = [
    ["/en/products/hug-pomelo-leaf", "Hug Pomelo Leaf", "30 × 16 cm"],
    ["/en/products/th-1", "The Universe in a Nutshell", "78 original cards"],
    [
      "/en/products/zodiac-tarot-necklace",
      "Zodiac Tarot Necklace",
      "Twelve zodiac signs",
    ],
    [
      "/en/products/eb-shake-silver-heart",
      "Silver Heart Shake Chain",
      "Bags / belt loops / display",
    ],
  ];

  for (const [pathname, productName, productSpec] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(productName), pathname);
    assert.match(html, new RegExp(productSpec), pathname);
    assert.match(html, /View all products/, pathname);
    assert.match(html, /PREVIOUS/, pathname);
    assert.match(html, /NEXT/, pathname);
    assert.match(html, /href="\/en\/products"/, pathname);
    assert.match(html, /href="\/products\//, pathname);
    assert.doesNotMatch(html, /\/_vinext\/image\?/, pathname);
  }
});

test("keeps the brand system and product assets wired", async () => {
  const [
    page,
    englishHome,
    homePage,
    catalog,
    productRoute,
    productDetail,
    layout,
    css,
  ] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/home-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/catalog.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../app/products/[slug]/page.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/product-detail-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /export const metadata:\s*Metadata/);
  assert.match(page, /return <HomePage \/>/);
  assert.match(englishHome, /<HomePage locale="en" \/>/);
  assert.match(homePage, /id="products"/);
  assert.match(homePage, /id="about"/);
  assert.match(homePage, /\/products\/\$\{product\.slug\}/);
  assert.match(catalog, /category:\s*"毛绒玩偶"/);
  assert.match(catalog, /size:\s*"30 × 16 cm"/);
  assert.match(catalog, /code:\s*"TH-1"/);
  assert.match(catalog, /category:\s*"科技潮玩"/);
  assert.match(catalog, /category:\s*"潮流配饰"/);
  assert.match(catalog, /code:\s*"EB-SHAKE"/);
  assert.match(productRoute, /generateProductStaticParams/);
  assert.match(productDetail, /productPageMap\.get\(slug\)/);
  assert.match(productDetail, /product-pagination/);
  assert.match(layout, /<html lang="zh-CN">/);
  assert.match(layout, /https:\/\/www\.woolleygoods\.com/);
  assert.match(layout, /FUN|趣调成熟|温暖科技/i);
  assert.match(css, /--ink:\s*#42271e/i);
  assert.match(css, /--cream:\s*#fffae7/i);
  assert.match(css, /--citrus:\s*#ffe59d/i);
  assert.match(css, /--sky:\s*#a2d4f1/i);
  assert.match(css, /--berry:\s*#e9a1c1/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);

  await Promise.all([
    access(new URL("../public/brand/woolley-logo.png", import.meta.url)),
    access(new URL("../public/brand/woolley-cooking.png", import.meta.url)),
    access(new URL("../public/brand/woolley-working.png", import.meta.url)),
    access(new URL("../public/brand/woolley-resting.png", import.meta.url)),
    access(new URL("../public/brand/woolley-pattern.png", import.meta.url)),
    access(
      new URL(
        "../public/products/hug-pomelo-leaf/hero.png",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/products/hug-pomelo-leaf/film.mp4",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/products/th-1/product-views.png",
        import.meta.url,
      ),
    ),
    access(new URL("../public/products/th-1/cards.jpg", import.meta.url)),
    access(
      new URL(
        "../public/products/zodiac-tarot-necklace/hero.jpg",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/products/zodiac-tarot-necklace/packaging-detail.jpg",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/products/eb-shake-silver-heart/hero.jpg",
        import.meta.url,
      ),
    ),
    access(
      new URL(
        "../public/products/eb-shake-silver-heart/backing-card.png",
        import.meta.url,
      ),
    ),
  ]);
});
