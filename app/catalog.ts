export const plushProduct = {
  index: "001",
  category: "毛绒玩偶",
  categoryEn: "PLUSH",
  name: "抱抱柚子叶",
  nameEn: "Hug Pomelo Leaf",
  size: "30 × 16 cm",
  story:
    "我是来自果壳宇宙的小精灵。我的使命，是把星光般的好运轻轻递到你手里。",
  assets: {
    hero: "/products/hug-pomelo-leaf/hero.png",
    details: "/products/hug-pomelo-leaf/details.jpg",
    angles: "/products/hug-pomelo-leaf/angles.jpg",
    identity: "/products/hug-pomelo-leaf/identity-card.jpg",
    scenes: "/products/hug-pomelo-leaf/scenarios.jpg",
    size: "/products/hug-pomelo-leaf/size.jpg",
    gift: "/products/hug-pomelo-leaf/gift-box.jpg",
    film: "/products/hug-pomelo-leaf/film.mp4",
  },
} as const;

export const tarotProduct = {
  index: "002",
  code: "TH-1",
  category: "科技潮玩",
  categoryEn: "TECH TOY",
  name: "乌哩掌心塔罗",
  nameEn: "The Universe in a Nutshell",
  assets: {
    hero: "/products/th-1/hero-concept.png",
    views: "/products/th-1/product-views.png",
    colors: "/products/th-1/colors.png",
    keychain: "/products/th-1/keychain-concept.png",
    cards: "/products/th-1/cards.jpg",
  },
} as const;

export const necklaceProduct = {
  index: "003",
  category: "潮流配饰",
  categoryEn: "ACCESSORY",
  name: "星座塔罗项链",
  nameEn: "Zodiac Tarot Necklace",
  assets: {
    hero: "/products/zodiac-tarot-necklace/hero.jpg",
    packaging: "/products/zodiac-tarot-necklace/packaging.jpg",
    packagingDetail: "/products/zodiac-tarot-necklace/packaging-detail.jpg",
    fire: "/products/zodiac-tarot-necklace/fire-signs.jpg",
    earth: "/products/zodiac-tarot-necklace/earth-signs.jpg",
    air: "/products/zodiac-tarot-necklace/air-signs.jpg",
    water: "/products/zodiac-tarot-necklace/water-signs.jpg",
  },
} as const;

export const heartChainProduct = {
  index: "004",
  code: "EB-SHAKE",
  category: "潮流配饰",
  categoryEn: "ACCESSORY",
  name: "乌哩银色桃心挂链",
  nameEn: "Silver Heart Shake Chain",
  size: "26 × 270 mm",
  material: "PU + 合金",
  assets: {
    hero: "/products/eb-shake-silver-heart/hero.jpg",
    realShot: "/products/eb-shake-silver-heart/real-shot.jpg",
    backingCard: "/products/eb-shake-silver-heart/backing-card.png",
    packaging: "/products/eb-shake-silver-heart/packaging.jpg",
    specifications: "/products/eb-shake-silver-heart/specifications.jpg",
    display: "/products/eb-shake-silver-heart/display.jpg",
    packagingSquare: "/products/eb-shake-silver-heart/packaging-square.jpg",
    scenesSquare: "/products/eb-shake-silver-heart/scenes-square.jpg",
  },
} as const;

export const brandDirections = ["科技潮玩", "潮流配饰", "交互毛绒", "AI 陪伴"];
export const brandDirectionsEn = [
  "Tech Toys",
  "Fashion Accessories",
  "Interactive Plush",
  "AI Companions",
];

export type Locale = "zh" | "en";

export type ProductTheme = "plush" | "tech" | "necklace" | "heart";

export type ProductPage = {
  slug: string;
  index: string;
  code?: string;
  category: string;
  categoryEn: string;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  intro: string;
  introEn: string;
  theme: ProductTheme;
  hero: string;
  heroFit?: "cover" | "contain";
  specs: Array<{
    label: string;
    labelEn: string;
    value: string;
    valueEn: string;
  }>;
  gallery: Array<{
    src: string;
    alt: string;
    altEn: string;
    label: string;
    labelEn: string;
    fit?: "cover" | "contain";
  }>;
  film?: string;
  note?: string;
  noteEn?: string;
};

export const productPages: ProductPage[] = [
  {
    slug: "hug-pomelo-leaf",
    index: plushProduct.index,
    category: plushProduct.category,
    categoryEn: plushProduct.categoryEn,
    name: plushProduct.name,
    nameEn: plushProduct.nameEn,
    tagline: "软软抱住，把不安留在身后。",
    taglineEn: "A soft embrace that leaves worries behind.",
    intro: plushProduct.story,
    introEn:
      "I’m a tiny spirit from the Nutshell Universe. My mission is to place a little starlit luck right into your hands.",
    theme: "plush",
    hero: plushProduct.assets.hero,
    heroFit: "contain",
    specs: [
      {
        label: "尺寸",
        labelEn: "Size",
        value: plushProduct.size,
        valueEn: plushProduct.size,
      },
      {
        label: "触感",
        labelEn: "Touch",
        value: "柔软亲肤",
        valueEn: "Soft & skin-friendly",
      },
      {
        label: "互动",
        labelEn: "Interaction",
        value: "磁吸双手",
        valueEn: "Magnetic hands",
      },
    ],
    gallery: [
      {
        src: plushProduct.assets.details,
        alt: "抱抱柚子叶刺绣与磁吸细节",
        altEn: "Embroidery and magnetic details of Hug Pomelo Leaf",
        label: "可塑枝叶与细腻刺绣",
        labelEn: "Flexible leaves and fine embroidery",
        fit: "contain",
      },
      {
        src: plushProduct.assets.angles,
        alt: "抱抱柚子叶多角度展示",
        altEn: "Hug Pomelo Leaf shown from multiple angles",
        label: "从每个角度都松软可爱",
        labelEn: "Soft and lovable from every angle",
        fit: "contain",
      },
      {
        src: plushProduct.assets.gift,
        alt: "抱抱柚子叶礼盒包装",
        altEn: "Hug Pomelo Leaf gift box packaging",
        label: "完整礼盒与香氛身份卡",
        labelEn: "Gift-ready box and scented character card",
        fit: "contain",
      },
    ],
    film: plushProduct.assets.film,
  },
  {
    slug: "th-1",
    index: tarotProduct.index,
    code: tarotProduct.code,
    category: tarotProduct.category,
    categoryEn: tarotProduct.categoryEn,
    name: tarotProduct.name,
    nameEn: tarotProduct.nameEn,
    tagline: "把一座果壳宇宙装进口袋。",
    taglineEn: "Carry a whole Nutshell Universe in your pocket.",
    intro:
      "一款融合原创乌哩 IP、电子宠物与轻量塔罗玩法的随身掌机，让每日灵感、卡牌解读与主题换装变得轻松有趣。",
    introEn:
      "A pocket console combining original Woolley characters, a virtual pet, and light tarot-inspired play—bringing daily prompts, card readings, and themed outfits into one playful object.",
    theme: "tech",
    hero: tarotProduct.assets.hero,
    heroFit: "contain",
    specs: [
      {
        label: "屏幕",
        labelEn: "Display",
        value: "2.4 英寸彩屏",
        valueEn: "2.4-inch color display",
      },
      {
        label: "内容",
        labelEn: "Content",
        value: "78 张原创卡牌",
        valueEn: "78 original cards",
      },
      {
        label: "外观",
        labelEn: "Themes",
        value: "22 种主题换装",
        valueEn: "22 visual themes",
      },
    ],
    gallery: [
      {
        src: tarotProduct.assets.views,
        alt: "TH-1 乌哩掌心塔罗产品视图",
        altEn: "Product views of the TH-1 pocket tarot console",
        label: "松果造型的原创 ID 设计",
        labelEn: "Original pinecone-shaped industrial design",
        fit: "contain",
      },
      {
        src: tarotProduct.assets.colors,
        alt: "TH-1 三种配色",
        altEn: "Three colorways of the TH-1 console",
        label: "紫、黄、粉三款情绪配色",
        labelEn: "Purple, yellow, and pink moods",
        fit: "contain",
      },
      {
        src: tarotProduct.assets.cards,
        alt: "乌哩原创塔罗卡牌",
        altEn: "Original Woolley tarot-inspired cards",
        label: "持续生长的果壳宇宙牌组",
        labelEn: "An ever-growing Nutshell Universe deck",
        fit: "contain",
      },
    ],
    note: "产品内容仅供娱乐，请勿相信任何封建迷信。",
    noteEn:
      "For entertainment only. Please do not treat the content as factual guidance.",
  },
  {
    slug: "zodiac-tarot-necklace",
    index: necklaceProduct.index,
    category: necklaceProduct.category,
    categoryEn: necklaceProduct.categoryEn,
    name: necklaceProduct.name,
    nameEn: necklaceProduct.nameEn,
    tagline: "把属于你的那张牌，戴在身上。",
    taglineEn: "Wear the card that feels like yours.",
    intro:
      "十二星座与原创乌哩塔罗相遇，把细小而鲜明的角色故事收进金属吊坠，成为可以日常佩戴的个人符号。",
    introEn:
      "The twelve zodiac signs meet Woolley’s original tarot universe. Each metal pendant holds a small but vivid character story, turning it into a personal symbol for everyday wear.",
    theme: "necklace",
    hero: necklaceProduct.assets.hero,
    heroFit: "contain",
    specs: [
      {
        label: "系列",
        labelEn: "Collection",
        value: "十二星座",
        valueEn: "Twelve zodiac signs",
      },
      {
        label: "分类",
        labelEn: "Groups",
        value: "四大元素",
        valueEn: "Four elements",
      },
      {
        label: "包装",
        labelEn: "Packaging",
        value: "专属展示礼盒",
        valueEn: "Display gift box",
      },
    ],
    gallery: [
      {
        src: necklaceProduct.assets.fire,
        alt: "火象星座塔罗项链",
        altEn: "Fire-sign zodiac tarot necklaces",
        label: "Fire Signs · 火象星座",
        labelEn: "Fire Signs",
        fit: "contain",
      },
      {
        src: necklaceProduct.assets.air,
        alt: "风象星座塔罗项链",
        altEn: "Air-sign zodiac tarot necklaces",
        label: "Air Signs · 风象星座",
        labelEn: "Air Signs",
        fit: "contain",
      },
      {
        src: necklaceProduct.assets.packagingDetail,
        alt: "星座塔罗项链礼盒包装",
        altEn: "Zodiac Tarot Necklace display gift box",
        label: "收藏与送礼兼具的展示包装",
        labelEn: "Display packaging made for collecting and gifting",
        fit: "contain",
      },
    ],
  },
  {
    slug: "eb-shake-silver-heart",
    index: heartChainProduct.index,
    code: heartChainProduct.code,
    category: heartChainProduct.category,
    categoryEn: heartChainProduct.categoryEn,
    name: heartChainProduct.name,
    nameEn: heartChainProduct.nameEn,
    tagline: "让好运，随着每一步轻轻摇响。",
    taglineEn: "Let a little luck chime with every step.",
    intro:
      "流动桃心、精灵蝴蝶与银色绳结组成一件可以挂在包袋、腰袢与随身物件上的情绪配饰，为日常加入一点成熟又俏皮的光泽。",
    introEn:
      "A flowing heart, fairy butterfly, and silver knots come together in an expressive accessory for bags, belt loops, and everyday objects—mature, playful, and bright.",
    theme: "heart",
    hero: heartChainProduct.assets.realShot,
    heroFit: "contain",
    specs: [
      {
        label: "尺寸",
        labelEn: "Size",
        value: heartChainProduct.size,
        valueEn: heartChainProduct.size,
      },
      {
        label: "材质",
        labelEn: "Material",
        value: heartChainProduct.material,
        valueEn: "PU + alloy",
      },
      {
        label: "使用",
        labelEn: "Style",
        value: "包袋 / 腰袢 / 桌面",
        valueEn: "Bags / belt loops / display",
      },
    ],
    gallery: [
      {
        src: heartChainProduct.assets.scenesSquare,
        alt: "银色桃心挂链穿搭场景",
        altEn: "Silver Heart Shake Chain styled on bags and outfits",
        label: "自由挂搭，为造型增加亮点",
        labelEn: "Style it freely for a bright accent",
      },
      {
        src: heartChainProduct.assets.packagingSquare,
        alt: "银色桃心挂链包装",
        altEn: "Silver Heart Shake Chain packaging",
        label: "暗夜紫背卡包装",
        labelEn: "Midnight-purple backing card",
      },
      {
        src: heartChainProduct.assets.backingCard,
        alt: "银色桃心挂链完整产品",
        altEn: "Complete Silver Heart Shake Chain product",
        label: "流动桃心、蝴蝶与绳结细节",
        labelEn: "Flowing heart, butterfly, and knot details",
        fit: "contain",
      },
    ],
  },
];

export const productPageMap = new Map(
  productPages.map((product) => [product.slug, product]),
);

export function getProductCopy(product: ProductPage, locale: Locale) {
  const isEnglish = locale === "en";

  return {
    category: isEnglish ? product.categoryEn : product.category,
    name: isEnglish ? product.nameEn : product.name,
    secondaryName: isEnglish ? product.name : product.nameEn,
    tagline: isEnglish ? product.taglineEn : product.tagline,
    intro: isEnglish ? product.introEn : product.intro,
    specs: product.specs.map((spec) => ({
      label: isEnglish ? spec.labelEn : spec.label,
      value: isEnglish ? spec.valueEn : spec.value,
    })),
    gallery: product.gallery.map((item) => ({
      ...item,
      alt: isEnglish ? item.altEn : item.alt,
      label: isEnglish ? item.labelEn : item.label,
    })),
    note: isEnglish ? product.noteEn : product.note,
  };
}
