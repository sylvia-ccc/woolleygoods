import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /<title>Woolley 乌哩文化创意｜Woolley<\/title>/i);
  assert.match(html, /FUN AND MATURE/);
  assert.match(html, /科技潮玩/);
  assert.match(html, /潮流配饰/);
  assert.match(html, /交互毛绒/);
  assert.match(html, /AI 陪伴/);
  assert.match(html, /抱抱柚子叶/);
  assert.match(html, /乌哩掌心塔罗/);
  assert.match(html, /TH-1/);
  assert.match(html, /78/);
  assert.match(html, /星座塔罗项链/);
  assert.match(html, /十二星座/);
  assert.match(html, /乌哩银色桃心挂链/);
  assert.match(html, /EB-SHAKE/);
  assert.match(html, /26 × 270 mm/);
  assert.match(html, /趣调成熟/);
  assert.match(html, /让每一次热爱/);
  assert.match(html, /来自松果星球/);
  assert.match(html, /2025\.06\.01/);
  assert.match(html, /products\/hug-pomelo-leaf\/film\.mp4/);
  assert.match(html, /brand\/woolley-logo\.png/);
  assert.match(html, /brand\/woolley-cooking\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the brand system and product assets wired", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /export const metadata:\s*Metadata/);
  assert.match(page, /category:\s*"毛绒玩偶"/);
  assert.match(page, /size:\s*"30 × 16 cm"/);
  assert.match(page, /code:\s*"TH-1"/);
  assert.match(page, /category:\s*"科技潮玩"/);
  assert.match(page, /id="tarot"/);
  assert.match(page, /category:\s*"潮流配饰"/);
  assert.match(page, /id="necklace"/);
  assert.match(page, /code:\s*"EB-SHAKE"/);
  assert.match(page, /id="heart-chain"/);
  assert.match(page, /id="philosophy"/);
  assert.match(page, /id="products"/);
  assert.match(page, /id="universe"/);
  assert.match(page, /id="about"/);
  assert.match(layout, /<html lang="zh-CN">/);
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
