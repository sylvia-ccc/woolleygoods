"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "./catalog";

type MobileMenuProps = {
  locale: Locale;
  currentPath: string;
  homeHref: string;
  productsHref: string;
  aboutHref: string;
};

export function MobileMenu({
  locale,
  currentPath,
  homeHref,
  productsHref,
  aboutHref,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEnglish = locale === "en";
  const items = [
    { href: homeHref, label: isEnglish ? "Home" : "首页" },
    { href: productsHref, label: isEnglish ? "Products" : "产品" },
    { href: aboutHref, label: isEnglish ? "Brand" : "品牌" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        className={`mobile-menu-toggle${isOpen ? " is-open" : ""}`}
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? isEnglish
              ? "Close navigation"
              : "关闭导航"
            : isEnglish
              ? "Open navigation"
              : "打开导航"
        }
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        className={`mobile-navigation${isOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!isOpen}
      >
        <button
          className="mobile-navigation-backdrop"
          type="button"
          aria-label={isEnglish ? "Close navigation" : "关闭导航"}
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
        />
        <nav
          className="mobile-navigation-panel"
          aria-label={isEnglish ? "Mobile navigation" : "移动端导航"}
        >
          <p className="section-kicker">WOOLLEY · {isEnglish ? "MENU" : "菜单"}</p>
          <div className="mobile-navigation-links">
            {items.map((item) => {
              const isCurrent =
                currentPath === item.href ||
                currentPath.startsWith(`${item.href}/`);

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
          <p className="mobile-navigation-note">
            {isEnglish
              ? "Warm technology / playful objects / daily companions"
              : "温暖科技 · 趣味物件 · 日常陪伴"}
          </p>
        </nav>
      </div>
    </>
  );
}
