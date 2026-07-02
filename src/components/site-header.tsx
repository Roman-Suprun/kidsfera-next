"use client";

import { useState } from "react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/strapi";

type Props = {
  locale: Locale;
  settings: SiteSettings;
};

function renderBrandName(name: string) {
  const cutIndex = Math.max(1, name.length - 5);

  return (
    <span className="font-display text-lg font-bold tracking-tight">
      {name.slice(0, cutIndex)}
      <span className="text-[var(--color-primary)]">{name.slice(cutIndex)}</span>
    </span>
  );
}

export function SiteHeader({ locale, settings }: Props) {
  const homeHref = withLocale(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[color:rgba(255,254,245,0.95)] backdrop-blur-sm">
      <div className="site-container flex h-16 items-center justify-between gap-4">
        <Link href={homeHref} className="flex shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
            <span className="font-display text-sm font-bold text-white">
              K
            </span>
          </div>
          {renderBrandName(settings.siteName)}
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 md:flex">
          <Link className="nav-link whitespace-nowrap" href={withLocale(locale, "/categories")}>
            {settings.navCategoriesLabel}
          </Link>
          <Link className="nav-link whitespace-nowrap" href={withLocale(locale, "/catalog")}>
            {settings.navCatalogLabel}
          </Link>
          <Link className="nav-link whitespace-nowrap" href={withLocale(locale, "/projects")}>
            {settings.navProjectsLabel}
          </Link>
          <Link className="nav-link whitespace-nowrap" href={`${homeHref}#process`}>
            {settings.navProcessLabel}
          </Link>
          <Link className="nav-link whitespace-nowrap" href={`${homeHref}#contact`}>
            {settings.navContactLabel}
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`${homeHref}#contact`}
            className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e03d00]"
          >
            {settings.navCtaLabel}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <div className="relative">
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex cursor-pointer items-center rounded-xl p-2 text-[var(--color-foreground)]"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>
            {mobileMenuOpen ? (
              <div className="absolute right-0 top-full mt-2 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_18px_40px_rgba(20,18,16,0.14)]">
                <Link
                  className="nav-link"
                  href={withLocale(locale, "/categories")}
                  onClick={closeMobileMenu}
                >
                  {settings.navCategoriesLabel}
                </Link>
                <Link
                  className="nav-link"
                  href={withLocale(locale, "/catalog")}
                  onClick={closeMobileMenu}
                >
                  {settings.navCatalogLabel}
                </Link>
                <Link
                  className="nav-link"
                  href={withLocale(locale, "/projects")}
                  onClick={closeMobileMenu}
                >
                  {settings.navProjectsLabel}
                </Link>
                <Link
                  className="nav-link"
                  href={`${homeHref}#process`}
                  onClick={closeMobileMenu}
                >
                  {settings.navProcessLabel}
                </Link>
                <Link
                  className="nav-link"
                  href={`${homeHref}#contact`}
                  onClick={closeMobileMenu}
                >
                  {settings.navContactLabel}
                </Link>
                <Link
                  href={`${homeHref}#contact`}
                  onClick={closeMobileMenu}
                  className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#e03d00]"
                >
                  {settings.navCtaLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
