import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../site-chrome";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "秘密守护兽 HUSH｜Woolley AI Lab",
  description:
    "Woolley AI Lab 概念产品：秘密守护兽 HUSH 与双人约定陪伴物 BOND。",
  alternates: { canonical: "/ai-lab" },
  openGraph: {
    title: "秘密守护兽 HUSH｜Woolley AI Lab",
    description: "每天说一句，等未来的你来打开。",
    images: [
      {
        url: "/concepts/ai-lab/hush-whisper-keeper.png",
        alt: "秘密守护兽 HUSH 私人声音时间胶囊概念产品",
      },
    ],
  },
};

const hushJourney = [
  { index: "01", label: "SAY", title: "长按胸口", copy: "长按 1 秒，暖光开始呼吸。" },
  { index: "02", label: "SEAL", title: "留下一句", copy: "说出 2–60 秒低语，松手即封存。" },
  { index: "03", label: "WAIT", title: "交给时间", copy: "从 7 天开始，逐步走向 30 天与一年。" },
  { index: "04", label: "RETURN", title: "未来归还", copy: "先猜那天的自己，再回听并留下回应。" },
] as const;

const hushFeatures = [
  { title: "ONE A DAY", copy: "每天最多一颗低语；封存后保留 10 秒撤销窗口。" },
  { title: "TIME LOCK", copy: "到期前无法提前播放，让等待成为体验本身。" },
  { title: "ZERO KNOWLEDGE", copy: "音频即时加密，品牌服务不持有可读取内容的密钥。" },
  { title: "LOCAL FIRST", copy: "断网也能保存，概念目标支持至少 30 颗 60 秒低语缓存。" },
  { title: "PHYSICAL PRIVACY", copy: "独立物理隐私锁，一眼确认当前是否允许录音。" },
  { title: "PRIVATE RETURN", copy: "回听前进行生物识别，并优先提示连接耳机。" },
] as const;

const hushSpecs = [
  ["尺寸", "60–90 mm"],
  ["重量", "80–160 g"],
  ["材质", "短绒软壳 + 刚性硬件内核"],
  ["连接", "BLE 5.x / 首代无 Wi-Fi"],
  ["续航", "典型使用 ≥ 14 天"],
  ["充电", "USB-C / 磁吸底座概念"],
  ["本地缓存", "≥ 30 × 60 秒加密音频"],
  ["价格假设", "DTC USD 69–79"],
] as const;

const concepts = [
  {
    number: "02",
    code: "BOND",
    name: "约定石",
    type: "PROMISE COMPANIONS",
    line: "两个人，把同一个以后放在这里。",
    description:
      "一对只在共同约定到期时亮起的陪伴物。两边分别封存一句话，直到它们再次靠近，才完成一次双向归还。",
    image: "/concepts/ai-lab/bond-promise-companions.png",
    alt: "BOND 约定石双人 AI 陪伴概念产品渲染",
    color: "rose",
    functions: ["双人共同封存", "未来日期约定", "合体光线反馈"],
    specs: ["2 × 75 mm", "双设备密钥", "BLE", "共享充电底座"],
  },
] as const;

const principles = [
  {
    index: "A",
    title: "先是物件，再是 AI",
    copy: "即使不开机，也应该是一件愿意摆在身边、带在身上或抱进被窝的好设计。",
  },
  {
    index: "B",
    title: "有回应，不抢注意力",
    copy: "用光、声音与触感做低打扰反馈，让科技退后一步，让感受留在前面。",
  },
  {
    index: "C",
    title: "记得边界，也记得你",
    copy: "每一份记忆都可见、可控、可删除；陪伴建立在尊重与透明之上。",
  },
] as const;

export default function AiLabPage() {
  return (
    <main className={styles.page} id="main-content">
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/" aria-label="返回 Woolley 官网">
          <Image
            src="/brand/woolley-logo.png"
            alt="Woolley"
            fill
            priority
            unoptimized
            sizes="124px"
          />
        </Link>
        <nav className={styles.nav} aria-label="AI Lab 页面导航">
          <a href="#hush">秘密守护兽</a>
          <a href="#concepts">未来概念</a>
          <a href="#principles">设计原则</a>
          <Link href="/products">现有产品</Link>
        </nav>
        <span className={styles.headerStamp}>AI LAB · 2027</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>FLAGSHIP CONCEPT / PRIORITY 01</p>
          <h1>
            Whisper
            <br />
            <em>Keeper.</em>
          </h1>
          <p className={styles.heroLead}>
            每天说一句，
            <br />
            等未来的你来打开。
          </p>
          <a className={styles.heroLink} href="#hush">
            认识秘密守护兽 <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image
              src="/concepts/ai-lab/hush-whisper-keeper.png"
              alt="秘密守护兽 HUSH 私人声音时间胶囊概念产品"
              fill
              priority
              unoptimized
              sizes="(max-width: 860px) 100vw, 58vw"
            />
          </div>
          <div className={styles.heroObjectLabel}>
            <span>OBJECT 01 / PRIVATE VOICE TIME CAPSULE</span>
            <strong>HUSH</strong>
            <span>ONE WHISPER A DAY · SEALED UNTIL THE FUTURE</span>
          </div>
          <span className={styles.heroEdition}>CONCEPT / IN DEVELOPMENT</span>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <span>ONE WHISPER A DAY</span>
        <i>✦</i>
        <span>SEALED UNTIL THE FUTURE</span>
        <i>✦</i>
        <span>ONLY YOU HOLD THE KEY</span>
        <i>✦</i>
        <span>ONE WHISPER A DAY</span>
      </div>

      <section className={styles.intro} aria-labelledby="intro-title">
        <p className={styles.eyebrow}>A GUARDIAN FOR THINGS LEFT UNSAID</p>
        <h2 id="intro-title">
          它不回答你，
          <br />
          <span>它替时间保管你。</span>
        </h2>
        <p>
          HUSH 不是聊天机器人，也不扮演治疗师。它只做一件事：安全收下一句今天的低语，
          在约定的未来，将它完整地归还给你。
        </p>
      </section>

      <section className={styles.hushSection} id="hush" aria-labelledby="hush-title">
        <div className={styles.hushIntro}>
          <div>
            <p className={styles.eyebrow}>THE HERO PRODUCT / HUSH 01</p>
            <h2 id="hush-title">秘密守护兽</h2>
          </div>
          <p className={styles.hushPromise}>
            一只安静、稳定、不追问的桌面守护者。
            <span>秘密只属于你，品牌也无法听见。</span>
          </p>
        </div>

        <div className={styles.hushJourney} aria-label="秘密守护兽使用流程">
          {hushJourney.map((step) => (
            <article className={styles.journeyStep} key={step.index}>
              <div>
                <span>{step.index}</span>
                <small>{step.label}</small>
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>

        <div className={styles.hushDetailGrid}>
          <div className={styles.featurePanel}>
            <div className={styles.panelHeading}>
              <p className={styles.eyebrow}>CORE EXPERIENCE</p>
              <h3>只有必要的功能。</h3>
            </div>
            <div className={styles.featureGrid}>
              {hushFeatures.map((feature) => (
                <article className={styles.featureCard} key={feature.title}>
                  <span>{feature.title}</span>
                  <p>{feature.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.specPanel}>
            <div className={styles.panelHeading}>
              <p className={styles.eyebrow}>CONCEPT SPECIFICATIONS</p>
              <h3>首代产品目标。</h3>
            </div>
            <dl className={styles.specTable}>
              {hushSpecs.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.specNote}>以上为概念目标，最终规格以工程验证与量产版本为准。</p>
          </div>
        </div>

        <div className={styles.scopeGuard}>
          <p className={styles.eyebrow}>WHAT HUSH WILL NOT DO</p>
          <h3>它不是一个永远在线的聊天机器人。</h3>
          <ul>
            <li>不转写、不分析你的低语</li>
            <li>不提供 AI 回复或情绪诊断</li>
            <li>无摄像头、无屏幕眼睛、无连续监听</li>
            <li>秘密不会在设备上直接外放</li>
          </ul>
        </div>
      </section>

      <section className={styles.concepts} id="concepts" aria-label="未来 AI 概念产品">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>SECOND OBJECT / RELATIONSHIP STUDY</p>
          <h2>从自己的秘密，到两个人的约定。</h2>
          <p>BOND 延续同一套时间胶囊语言，是 HUSH 之外唯一保留的关系概念研究。</p>
        </div>

        <div className={styles.conceptList}>
          {concepts.map((concept) => (
            <article
              className={`${styles.conceptCard} ${styles[concept.color]}`}
              key={concept.code}
            >
              <div className={styles.conceptImage}>
                <Image
                  src={concept.image}
                  alt={concept.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 860px) 92vw, 54vw"
                />
                <span className={styles.conceptNumber}>{concept.number}</span>
                <span className={styles.futureLabel}>FUTURE STUDY</span>
              </div>
              <div className={styles.conceptCopy}>
                <p className={styles.conceptType}>{concept.type}</p>
                <h3>
                  {concept.code}
                  <span>{concept.name}</span>
                </h3>
                <p className={styles.conceptLine}>{concept.line}</p>
                <p className={styles.conceptDescription}>{concept.description}</p>
                <div className={styles.conceptMeta}>
                  <div>
                    <h4>功能设想</h4>
                    <ul aria-label={`${concept.code} 功能设想`}>
                      {concept.functions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>概念参数</h4>
                    <ul aria-label={`${concept.code} 概念参数`}>
                      {concept.specs.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className={styles.conceptDisclaimer}>CONCEPT TARGETS · SUBJECT TO VALIDATION</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.principles} id="principles" aria-labelledby="principles-title">
        <div className={styles.principlesTitle}>
          <p className={styles.eyebrow}>HOW WE IMAGINE AI COMPANIONS</p>
          <h2 id="principles-title">温暖科技，先从克制开始。</h2>
        </div>
        <div className={styles.principleGrid}>
          {principles.map((principle) => (
            <article key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>WOOLLEY AI LAB / AN OPEN EXPLORATION</p>
        <h2>
          未来的陪伴，
          <br />
          <em>应该有一点柔软。</em>
        </h2>
        <div className={styles.closingMeta}>
          <span>CONCEPT SERIES / 2027</span>
          <span>SHENZHEN / CHINA</span>
          <Link href="/products">VIEW CURRENT PRODUCTS ↗</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
