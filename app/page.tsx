import NextImage from "next/image";
import type { Metadata } from "next";
import type { ComponentProps } from "react";
import HomePage from "./home-page";
import {
  brandDirections,
  heartChainProduct as heartChain,
  necklaceProduct as necklace,
  plushProduct as product,
  tarotProduct as tarot,
} from "./catalog";

function Image(props: ComponentProps<typeof NextImage>) {
  return <NextImage {...props} unoptimized />;
}

const productFamilies = [
  {
    index: product.index,
    category: product.category,
    categoryEn: product.categoryEn,
    name: product.name,
    nameEn: product.nameEn,
    image: product.assets.hero,
    href: "#plush",
    className: "product-family-plush",
  },
  {
    index: tarot.index,
    category: tarot.category,
    categoryEn: tarot.categoryEn,
    name: tarot.name,
    nameEn: tarot.nameEn,
    image: tarot.assets.hero,
    href: "#tarot",
    className: "product-family-tech",
  },
  {
    index: necklace.index,
    category: necklace.category,
    categoryEn: necklace.categoryEn,
    name: necklace.name,
    nameEn: necklace.nameEn,
    image: necklace.assets.hero,
    href: "#necklace",
    className: "product-family-accessory",
  },
  {
    index: heartChain.index,
    category: heartChain.category,
    categoryEn: heartChain.categoryEn,
    name: heartChain.name,
    nameEn: heartChain.nameEn,
    image: heartChain.assets.hero,
    href: "#heart-chain",
    className: "product-family-heart-chain",
  },
];

const features = [
  {
    number: "01",
    title: "枝叶，自由生长",
    copy: "枝干可随意弯折，让每一片叶子都有自己的姿态。",
  },
  {
    number: "02",
    title: "星芒，藏进叶脉",
    copy: "粉色叶片以高密刺绣点亮，把好运做成可以触摸的细节。",
  },
  {
    number: "03",
    title: "双手，轻轻抱住",
    copy: "磁吸手部可以自由组合动作，也能稳稳拥抱喜欢的小物。",
  },
];

const tarotFeatures = [
  {
    number: "01",
    title: "每日占卜",
    copy: "随身开启一局轻量塔罗互动，为今天抽取一张灵感提示。",
  },
  {
    number: "02",
    title: "牌阵占卜",
    copy: "清晰的牌阵指引，让抽牌、落牌与查看结果更容易上手。",
  },
  {
    number: "03",
    title: "卡牌解读",
    copy: "收录 7,000 字以上专属牌意，以原创角色讲述每一张牌。",
  },
  {
    number: "04",
    title: "主题换装",
    copy: "22 种塔罗主题外观，首页乌哩形象会随每日抽牌而变化。",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Woolleygoods｜Woolley 乌哩文化创意" },
  description:
    "Woolley 乌哩文化创意，以温暖科技打造科技潮玩、潮流配饰、交互毛绒与 AI 陪伴产品。",
  alternates: {
    canonical: "/",
    languages: { "zh-CN": "/", en: "/en" },
  },
};

export default function Home() {
  return <HomePage />;
}

export function LegacyHome() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Woolley 首页">
          <Image
            src="/brand/woolley-logo.png"
            alt="Woolley"
            fill
            priority
            sizes="120px"
            style={{ objectFit: "contain" }}
          />
        </a>
        <nav aria-label="主要导航">
          <a href="#philosophy">品牌</a>
          <a href="#products">产品</a>
          <a href="#universe">IP 世界</a>
          <a href="#about">关于我们</a>
        </nav>
        <a className="archive-link" href="#products">
          EXPLORE <span aria-hidden="true">↘</span>
        </a>
      </header>

      <section className="brand-home" id="top">
        <div className="brand-home-copy">
          <p className="section-kicker">WOOLLEY · SHENZHEN · EST. 2025</p>
          <h1>
            <span>让每一次热爱，</span>
            都因科技而
            <br />
            生动鲜活。
          </h1>
          <p className="brand-home-lead">
            从科技潮玩、潮流配饰到交互毛绒与 AI 陪伴，
            Woolley 把温暖科技放进日常，也把成熟生活重新玩出趣味。
          </p>
          <div className="brand-home-actions">
            <a className="button button-dark" href="#products">
              发现产品 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-light" href="#about">
              认识 Woolley <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="brand-home-signoff">FUN AND MATURE!!</p>
        </div>

        <div className="brand-home-stage">
          <div className="brand-stage-orbit" aria-hidden="true" />
          <figure className="brand-stage-card brand-stage-plush">
            <Image
              src={product.assets.hero}
              alt="抱抱柚子叶交互毛绒"
              fill
              priority
              sizes="(max-width: 860px) 68vw, 30vw"
            />
          </figure>
          <figure className="brand-stage-card brand-stage-tarot">
            <Image
              src={tarot.assets.hero}
              alt="乌哩掌心塔罗科技潮玩"
              fill
              priority
              sizes="(max-width: 860px) 34vw, 18vw"
            />
          </figure>
          <figure className="brand-stage-card brand-stage-necklace">
            <Image
              src={necklace.assets.hero}
              alt="星座塔罗项链"
              fill
              sizes="(max-width: 860px) 38vw, 19vw"
            />
          </figure>
          <div className="brand-stage-ip">
            <Image
              src="/brand/woolley-working.png"
              alt="Woolley 乌哩角色正在使用电脑"
              fill
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
        <span>让热爱因科技而鲜活</span>
        <span>WOOLLEY WORLD</span>
        <span>FUN AND MATURE!!</span>
      </div>

      <section className="brand-philosophy" id="philosophy">
        <div>
          <p className="section-kicker">OUR PHILOSOPHY</p>
          <h2>
            趣调成熟<span>!!</span>
            <br />
            <em>Fun and Mature</em>
          </h2>
        </div>
        <div className="brand-philosophy-copy">
          <p>
            当人们谈论科技，总习惯仰望它的宏大与深远；我们更想用它，
            创造一些微小而确定的温暖与共鸣。
          </p>
          <p>
            真正的成熟，不意味着放弃趣味，而是以更从容的姿态「玩」出格调。
            这正是 Woolley 的品牌主张。
          </p>
          <div className="brand-direction-list" aria-label="品牌产品方向">
            {brandDirections.map((direction, index) => (
              <span key={direction}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {direction}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="product-lineup" id="products">
        <div className="product-lineup-heading">
          <div>
            <p className="section-kicker">SELECTED PRODUCTS</p>
            <h2>用科技，收藏每一种喜欢。</h2>
          </div>
          <p>04 PRODUCT FAMILIES · MORE TO COME</p>
        </div>
        <div className="product-family-grid">
          {productFamilies.map((item) => (
            <a
              className={`product-family-card ${item.className}`}
              href={item.href}
              key={item.index}
            >
              <div className="product-family-image">
                <Image
                  src={item.image}
                  alt={`${item.name}产品展示`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="product-family-info">
                <p>
                  {item.categoryEn} / {item.index}
                </p>
                <h3>{item.name}</h3>
                <p>{item.nameEn}</p>
                <span>
                  查看产品 <b aria-hidden="true">↗</b>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="hero" id="plush">
        <div className="hero-copy">
          <p className="eyebrow">
            WOOLLEY · {product.categoryEn} / {product.index}
          </p>
          <h1>
            抱抱
            <span>柚子叶</span>
          </h1>
          <p className="hero-intro">
            一只从果壳宇宙抵达的好运精灵。
            <br />
            软软抱住，把不安留在身后。
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#character">
              认识它 <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-light" href="#film">
              观看短片 <span aria-hidden="true">▶</span>
            </a>
          </div>
          <dl className="hero-specs">
            <div>
              <dt>TYPE</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>SIZE</dt>
              <dd>{product.size}</dd>
            </div>
            <div>
              <dt>MOOD</dt>
              <dd>柔软 · 好运</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <div className="hero-star" aria-hidden="true">
            ✦
          </div>
          <div className="hero-image-wrap">
            <Image
              src={product.assets.hero}
              alt="抱抱柚子叶毛绒玩偶产品展示"
              fill
              priority
              sizes="(max-width: 860px) 100vw, 54vw"
            />
          </div>
          <p className="hero-caption">
            GOOD LUCK
            <br />
            HAS ARRIVED
          </p>
        </div>
      </section>

      <section className="manifesto" id="character">
        <p className="section-kicker">A LITTLE SPIRIT FROM THE NUTSHELL UNIVERSE</p>
        <h2>
          把星光般的好运，
          <br />
          <em>轻轻递到你手里。</em>
        </h2>
        <p>{product.story}</p>
        <div className="manifesto-orbit" aria-hidden="true">
          <span>GOOD LUCK</span>
          <span>小精灵</span>
          <span>HUG ME</span>
        </div>
      </section>

      <section className="details-section" id="details">
        <div className="section-heading">
          <p className="section-kicker">DESIGNED FOR LITTLE INTERACTIONS</p>
          <h2>每一处，都可以和你玩。</h2>
          <p>
            不只是一件摆设。可塑形、可拥抱、可互动，
            <br />
            让它在生活里慢慢长出自己的性格。
          </p>
        </div>

        <div className="feature-layout">
          <figure className="product-angle-card">
            <Image
              src={product.assets.angles}
              alt="抱抱柚子叶正面、背面与侧面展示"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
            <figcaption>FOUR VIEWS · 四面都可爱</figcaption>
          </figure>
          <div className="feature-list">
            {features.map((feature) => (
              <article className="feature-item" key={feature.number}>
                <span>{feature.number}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))}
            <div className="size-note">
              <span className="size-number">30</span>
              <span>
                CM
                <br />
                连枝叶高度
              </span>
              <span className="size-divider" aria-hidden="true" />
              <span className="size-number">16</span>
              <span>
                CM
                <br />
                玩偶宽度
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="film-section" id="film">
        <div className="film-copy">
          <p className="section-kicker section-kicker-light">A SMALL ARRIVAL</p>
          <h2>
            从礼盒里醒来，
            <br />
            好奇地看向你。
          </h2>
          <p>
            13 秒，记录抱抱柚子叶第一次从果壳宇宙来到身边。
            每一份礼盒，都是一次柔软的相遇。
          </p>
          <p className="film-note">短片含声音 · 可点击播放器开启</p>
        </div>
        <div className="film-frame">
          <video
            src={product.assets.film}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="抱抱柚子叶产品短片"
          />
          <span className="film-index">FILM / 001</span>
        </div>
        <p className="film-vertical" aria-hidden="true">
          FUN AND MATURE!! · FUN AND MATURE!! ·
        </p>
      </section>

      <section className="moments-section">
        <div className="moments-image">
          <Image
            src={product.assets.scenes}
            alt="抱抱柚子叶作为桌面摆件、抱枕与礼物的使用场景"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="moments-copy">
          <p className="section-kicker">ONE SPIRIT, MANY MOMENTS</p>
          <h2>陪伴，不止一种姿势。</h2>
          <div className="moment-list">
            <div>
              <span>01</span>
              <h3>桌面摆件</h3>
              <p>可塑型枝叶，让它在桌面保持喜欢的姿态。</p>
            </div>
            <div>
              <span>02</span>
              <h3>解压抱枕</h3>
              <p>软糯身体与磁吸小手，适合随时抱进怀里。</p>
            </div>
            <div>
              <span>03</span>
              <h3>居家搭档</h3>
              <p>在工位、沙发或床边，安静接住忙碌后的疲惫。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gift-section" id="gift">
        <div className="gift-heading">
          <p className="section-kicker">A GIFT WITH ITS OWN IDENTITY</p>
          <h2>打开礼盒，也打开一份好运。</h2>
        </div>
        <div className="gift-grid">
          <div className="gift-image">
            <Image
              src={product.assets.gift}
              alt="抱抱柚子叶毛绒礼盒、纸袋与香氛身份卡"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </div>
          <div className="gift-copy">
            <p className="gift-number">03 / PIECES</p>
            <ul>
              <li>
                <span>01</span>
                精美纸袋
              </li>
              <li>
                <span>02</span>
                毛绒礼盒
              </li>
              <li>
                <span>03</span>
                专属香氛身份卡
              </li>
            </ul>
            <p>
              仪式感完整抵达。无需二次包装，送给朋友，也送给想被治愈的自己。
            </p>
          </div>
        </div>
      </section>

      <section className="tarot-section" id="tarot">
        <div className="tarot-hero">
          <div className="tarot-copy">
            <p className="section-kicker">
              {tarot.categoryEn} / {tarot.index} · {tarot.code}
            </p>
            <p className="tarot-status">CONCEPT PRODUCT · 概念产品</p>
            <h2>
              乌哩
              <br />
              掌心塔罗
            </h2>
            <p className="tarot-subtitle">{tarot.nameEn}</p>
            <p className="tarot-intro">
              把一座果壳宇宙装进口袋。TH-1 将电子宠物机的陪伴感、
              原创塔罗卡牌与随身挂件形态结合，让每日抽牌成为一段轻松的角色互动。
            </p>
            <dl className="tarot-stats">
              <div>
                <dt>2.4”</dt>
                <dd>彩色屏幕</dd>
              </div>
              <div>
                <dt>78</dt>
                <dd>原创卡牌</dd>
              </div>
              <div>
                <dt>22</dt>
                <dd>主题装扮</dd>
              </div>
            </dl>
          </div>
          <div className="tarot-hero-image">
            <Image
              src={tarot.assets.hero}
              alt="TH-1 乌哩掌心塔罗紫色掌机概念效果"
              fill
              sizes="(max-width: 860px) 100vw, 48vw"
            />
            <span>TH-1 / PURPLE</span>
          </div>
        </div>

        <div className="tarot-details">
          <div className="tarot-views">
            <Image
              src={tarot.assets.views}
              alt="TH-1 塔罗掌机正面、背面与侧面设计"
              fill
              sizes="(max-width: 900px) 100vw, 54vw"
            />
          </div>
          <div className="tarot-feature-list">
            <p className="section-kicker">FOUR WAYS TO PLAY</p>
            <h3>一台掌机，四种相遇。</h3>
            {tarotFeatures.map((feature) => (
              <article key={feature.number}>
                <span>{feature.number}</span>
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="tarot-gallery">
          <figure className="tarot-colors">
            <Image
              src={tarot.assets.colors}
              alt="TH-1 塔罗掌机紫色、黄色和粉色三种配色"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
            <figcaption>LAVENDER · CITRUS · PINK</figcaption>
          </figure>
          <figure className="tarot-cards">
            <Image
              src={tarot.assets.cards}
              alt="果壳宇宙原创塔罗卡牌牌面展示"
              fill
              sizes="(max-width: 900px) 100vw, 36vw"
            />
            <figcaption>ORIGINAL CARD SYSTEM</figcaption>
          </figure>
        </div>

        <div className="tarot-note">
          <span>PLAY, DON’T PREDICT.</span>
          <p>
            产品内容仅供娱乐与创意互动，请勿将抽牌结果作为现实决策依据。
            当前图片为设计阶段展示，产品以最终实物为准。
          </p>
        </div>
      </section>

      <section className="necklace-section" id="necklace">
        <div className="necklace-heading">
          <p className="section-kicker">
            {necklace.categoryEn} / {necklace.index}
          </p>
          <h2>把属于你的那张牌，戴在身上。</h2>
          <div>
            <p>{necklace.name}</p>
            <p>{necklace.nameEn}</p>
          </div>
        </div>

        <div className="necklace-hero">
          <div className="necklace-hero-image">
            <Image
              src={necklace.assets.hero}
              alt="Woolley 十二星座塔罗项链系列"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </div>
          <div className="necklace-intro">
            <p className="section-kicker">YOUR SIGN · YOUR CARD</p>
            <h3>十二星座，十二种随身寓意。</h3>
            <p>
              将果壳宇宙的原创塔罗牌面缩进金属卡牌吊坠，
              以星座为线索，为每一种性格找到一张可以日常佩戴的角色卡。
            </p>
            <dl>
              <div>
                <dt>12</dt>
                <dd>星座款式</dd>
              </div>
              <div>
                <dt>04</dt>
                <dd>元素分组</dd>
              </div>
              <div>
                <dt>01</dt>
                <dd>完整礼盒</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="zodiac-heading">
          <p className="section-kicker">THE FOUR ELEMENTS</p>
          <h3>火、土、风、水，四种能量。</h3>
        </div>
        <div className="zodiac-grid">
          {[
            { name: "火象", en: "FIRE", image: necklace.assets.fire },
            { name: "土象", en: "EARTH", image: necklace.assets.earth },
            { name: "风象", en: "AIR", image: necklace.assets.air },
            { name: "水象", en: "WATER", image: necklace.assets.water },
          ].map((element) => (
            <figure key={element.en}>
              <Image
                src={element.image}
                alt={`${element.name}星座塔罗项链实拍`}
                fill
                sizes="(max-width: 760px) 50vw, 22vw"
              />
              <figcaption>
                <span>{element.name}</span>
                {element.en} SIGNS
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="necklace-packaging">
          <div className="necklace-packaging-copy">
            <p className="section-kicker">ELEGANT PACKAGING</p>
            <h3>从收藏，到送出，都有完整仪式感。</h3>
            <p>
              单条星座塔罗项链配有布艺收纳袋、寄语卡片与展示包装礼盒，
              让卡牌故事从佩戴延伸到开盒体验。
            </p>
            <ul>
              <li>星座塔罗项链</li>
              <li>布艺收纳袋</li>
              <li>寄语卡片</li>
              <li>展示包装礼盒</li>
            </ul>
          </div>
          <div className="necklace-packaging-image">
            <Image
              src={necklace.assets.packagingDetail}
              alt="星座塔罗项链展示礼盒与包装"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="heart-chain-section" id="heart-chain">
        <div className="heart-chain-heading">
          <p className="section-kicker">
            {heartChain.categoryEn} / {heartChain.index} · {heartChain.code}
          </p>
          <h2>
            让好运，随着每一步
            <br />
            轻轻摇响。
          </h2>
          <div>
            <p>{heartChain.name}</p>
            <p>{heartChain.nameEn}</p>
          </div>
        </div>

        <div className="heart-chain-hero">
          <figure className="heart-chain-hero-image">
            <Image
              src={heartChain.assets.realShot}
              alt="乌哩银色桃心挂链黑色背景实拍"
              fill
              sizes="(max-width: 900px) 100vw, 54vw"
            />
            <figcaption>REAL SHOT · SILVER HEART</figcaption>
          </figure>
          <div className="heart-chain-intro">
            <p className="section-kicker">GOOD LUCK SHAKE · 好运摇摇</p>
            <h3>一颗会随日常流动的银色桃心。</h3>
            <p>
              液态感桃心、蝴蝶坠饰与银色绳结组合成一条有层次的随身挂链。
              挂上背包、腰袢或钥匙扣，让每一次晃动都发出属于 Woolley 的「Wooo!」。
            </p>
            <dl>
              <div>
                <dt>26 × 270</dt>
                <dd>毫米 · 整体尺寸</dd>
              </div>
              <div>
                <dt>PU + ALLOY</dt>
                <dd>柔韧绳结 · 合金坠饰</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>包袋 · 腰袢 · 桌面</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="heart-chain-gallery-heading">
          <p className="section-kicker">STYLE IT YOUR WAY</p>
          <h3>不只挂在包上，也挂住自己的风格。</h3>
        </div>
        <div className="heart-chain-gallery">
          <figure>
            <Image
              src={heartChain.assets.scenesSquare}
              alt="银色桃心挂链包袋与穿搭使用场景"
              fill
              sizes="(max-width: 820px) 100vw, 50vw"
            />
            <figcaption>ON BAG · ON LOOK</figcaption>
          </figure>
          <figure>
            <Image
              src={heartChain.assets.packagingSquare}
              alt="乌哩银色桃心挂链背卡包装"
              fill
              sizes="(max-width: 820px) 100vw, 50vw"
            />
            <figcaption>READY TO GIFT</figcaption>
          </figure>
        </div>

        <div className="heart-chain-specs">
          <div className="heart-chain-specs-copy">
            <p className="section-kicker">OBJECT DETAILS</p>
            <h3>冷感银色，柔韧细节。</h3>
            <p>
              亮面桃心作为视觉中心，以蝴蝶、链条、金属珠线与银色 PU
              绳结叠出丰富层次。轻松扣合，适合在不同随身物件之间自由切换。
            </p>
            <ul>
              <li><span>产品名称</span>{heartChain.name}</li>
              <li><span>材质</span>{heartChain.material}</li>
              <li><span>尺寸</span>{heartChain.size}</li>
              <li><span>包装</span>专属背卡包装</li>
            </ul>
          </div>
          <figure className="heart-chain-specs-image">
            <Image
              src={heartChain.assets.backingCard}
              alt="乌哩银色桃心挂链完整背卡展示"
              fill
              sizes="(max-width: 820px) 100vw, 42vw"
            />
          </figure>
        </div>

        <div className="heart-chain-signoff">
          <span>WOOO!</span>
          <p>让每一次收藏，都有回应热爱的声音。</p>
        </div>
      </section>

      <section className="universe-section" id="universe">
        <div className="universe-copy">
          <p className="section-kicker">MEET WOOLLEY · 品牌 IP</p>
          <h2>
            来自松果星球的
            <br />
            方形松鼠「乌哩」。
          </h2>
          <p>
            他把闪着微光的电子屏幕误当成食物吞了下去，
            从此变成一只方方正正、带着科技感的米色松鼠。
            他热爱电子产品，也无法拒绝任何好吃的东西。
          </p>
          <dl className="universe-profile">
            <div>
              <dt>NAME</dt>
              <dd>Woolley 乌哩</dd>
            </div>
            <div>
              <dt>BIRTHDAY</dt>
              <dd>2025.06.01</dd>
            </div>
            <div>
              <dt>MBTI</dt>
              <dd>ENTP</dd>
            </div>
            <div>
              <dt>FAVORITES</dt>
              <dd>电子产品 · 美食</dd>
            </div>
          </dl>
        </div>
        <div className="universe-visual">
          <div className="universe-pattern" aria-hidden="true" />
          <figure className="universe-character universe-character-main">
            <Image
              src="/brand/woolley-cooking.png"
              alt="乌哩角色抱着食物"
              fill
              sizes="(max-width: 820px) 58vw, 26vw"
            />
          </figure>
          <figure className="universe-character universe-character-work">
            <Image
              src="/brand/woolley-working.png"
              alt="乌哩角色使用电脑"
              fill
              sizes="(max-width: 820px) 34vw, 15vw"
            />
          </figure>
          <figure className="universe-character universe-character-rest">
            <Image
              src="/brand/woolley-resting.png"
              alt="乌哩角色休息中"
              fill
              sizes="(max-width: 820px) 34vw, 15vw"
            />
          </figure>
          <span className="universe-wooo" aria-hidden="true">WOOO!</span>
        </div>
      </section>

      <section className="brand-section" id="about">
        <div className="brand-stamp" aria-hidden="true">
          FUN
          <br />
          ×
          <br />
          MATURE
        </div>
        <div className="brand-copy">
          <p className="section-kicker">WOOLLEY · EST. 2025 · SHENZHEN</p>
          <h2>
            让每一次热爱，
            <br />
            都因科技而生动鲜活。
          </h2>
          <div className="brand-intro">
            <p>
              深圳乌哩文化创意有限公司，源自海外智能家居品牌 SONOFF
              （深圳松诺技术）的年轻科技创意团队，于 2025 年创立 Woolley。
            </p>
            <p>
              凭借扎实的科技基因，我们把温暖科技放进日常生活，打造能被喜欢、
              被收藏，也能真正陪伴人的头部科技潮玩品牌。
            </p>
          </div>
        </div>
        <div className="brand-values" aria-label="品牌产品方向">
          {brandDirections.map((direction) => (
            <span key={direction}>{direction}</span>
          ))}
        </div>
      </section>

      <section className="archive-section" id="archive">
        <div className="archive-heading">
          <div>
            <p className="section-kicker">PRODUCT ARCHIVE</p>
            <h2>来自果壳宇宙</h2>
          </div>
          <p>04 PRODUCTS · MORE TO COME</p>
        </div>
        <div className="archive-grid">
          <article className="archive-card archive-card-plush">
            <div className="archive-image">
              <Image
                src={product.assets.hero}
                alt="抱抱柚子叶产品档案封面"
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </div>
            <div className="archive-info">
              <p>
                {product.categoryEn} / {product.index}
              </p>
              <h3>{product.name}</h3>
              <p>{product.nameEn}</p>
              <a href="#plush">
                查看角色档案 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className="archive-card archive-card-tarot">
            <div className="archive-image">
              <Image
                src={tarot.assets.hero}
                alt="TH-1 乌哩掌心塔罗产品档案封面"
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </div>
            <div className="archive-info">
              <p>
                {tarot.categoryEn} / {tarot.index}
              </p>
              <h3>{tarot.name}</h3>
              <p>{tarot.code} · {tarot.nameEn}</p>
              <a href="#tarot">
                查看产品档案 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className="archive-card archive-card-necklace">
            <div className="archive-image">
              <Image
                src={necklace.assets.hero}
                alt="星座塔罗项链产品档案封面"
                fill
                sizes="(max-width: 760px) 100vw, 28vw"
              />
            </div>
            <div className="archive-info">
              <p>
                {necklace.categoryEn} / {necklace.index}
              </p>
              <h3>{necklace.name}</h3>
              <p>{necklace.nameEn}</p>
              <a href="#necklace">
                查看系列档案 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
          <article className="archive-card archive-card-heart-chain">
            <div className="archive-image">
              <Image
                src={heartChain.assets.hero}
                alt="乌哩银色桃心挂链产品档案封面"
                fill
                sizes="(max-width: 760px) 100vw, 28vw"
              />
            </div>
            <div className="archive-info">
              <p>
                {heartChain.categoryEn} / {heartChain.index}
              </p>
              <h3>{heartChain.name}</h3>
              <p>{heartChain.code} · {heartChain.nameEn}</p>
              <a href="#heart-chain">
                查看系列档案 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-wordmark" href="#top">
          <Image
            src="/brand/woolley-logo.png"
            alt="Woolley"
            fill
            sizes="(max-width: 820px) 80vw, 38vw"
            style={{ objectFit: "contain" }}
          />
        </a>
        <p>FUN AND MATURE!!</p>
        <p>© 2026 WOOLLEY</p>
      </footer>
    </main>
  );
}
