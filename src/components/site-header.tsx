"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ClockIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocialLinkIcon } from "@/components/social-link-icon";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/strapi";

type Props = {
  locale: Locale;
  settings: SiteSettings;
};

const aboutLabelByLocale: Record<Locale, string> = {
  en: "About",
  uk: "Про нас",
  ru: "О нас",
  pl: "O nas",
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

function toPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SiteHeader({ locale, settings }: Props) {
  const homeHref = withLocale(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const socialLinks = settings.socialLinks ?? [];
  const aboutLabel = aboutLabelByLocale[locale];

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[var(--color-surface-strong)] text-white">
        <div className="site-container flex h-[var(--site-topbar-height)] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2 text-[11px] text-white/50 sm:gap-5">
            <a
              href={toPhoneHref(settings.contactPhone)}
              className="inline-flex min-w-0 items-center gap-1.5 rounded-full transition-colors hover:text-white"
            >
              <span aria-hidden="true" className="text-xs leading-none text-[var(--color-primary)]">
                📞
              </span>
              <span className="truncate">{settings.contactPhone}</span>
            </a>
            {settings.businessHoursPrimary ? (
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <span aria-hidden="true" className="text-xs leading-none text-[var(--color-primary)]">
                  🕐
                </span>
                <span>
                  {settings.businessHoursPrimary}
                  {settings.businessHoursSecondary ? ` · ${settings.businessHoursSecondary}` : ""}
                </span>
              </span>
            ) : null}
          </div>
          {socialLinks.length ? (
            <div className="flex shrink-0 items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={`${social.platform}-${social.href}`}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-white/40 transition-all hover:bg-white/12 hover:text-white"
                >
                  <SocialLinkIcon platform={social.platform} className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-b border-[var(--color-border)] bg-[color:rgba(255,254,245,0.96)] shadow-[0_12px_34px_rgba(20,18,16,0.12)] backdrop-blur-md">
        <div className="site-container flex h-[var(--site-nav-height)] items-center justify-between gap-4">
          <Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] shadow-[0_10px_22px_rgba(255,69,0,0.24)]">
              <span className="font-display text-[13px] font-bold text-white">K</span>
            </div>
            <div className="min-w-0">{renderBrandName(settings.siteName)}</div>
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
              {aboutLabel}
            </Link>
            <Link className="nav-link whitespace-nowrap" href={`${homeHref}#contact`}>
              {settings.navContactLabel}
            </Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`${homeHref}#contact`}
              className="rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,69,0,0.22)] transition-all hover:bg-[#e03d00]"
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
                className="flex cursor-pointer items-center rounded-xl border border-[var(--color-border)] bg-white/75 p-2 text-[var(--color-foreground)] shadow-sm"
              >
                {mobileMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
              {mobileMenuOpen ? (
                <div className="absolute right-0 top-full mt-3 flex w-[min(23rem,calc(100vw-2rem))] flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_22px_48px_rgba(20,18,16,0.16)]">
                  <div className="rounded-2xl bg-[var(--color-surface-strong)] p-4 text-white">
                    <div className="grid gap-3">
                      <a
                        href={toPhoneHref(settings.contactPhone)}
                        className="flex items-center gap-2 text-sm text-white/82"
                      >
                        <PhoneIcon className="h-4 w-4 text-[var(--color-primary)]" />
                        <span>{settings.contactPhone}</span>
                      </a>
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="flex items-center gap-2 text-sm text-white/82"
                      >
                        <MailIcon className="h-4 w-4 text-[var(--color-primary)]" />
                        <span>{settings.contactEmail}</span>
                      </a>
                      {settings.businessHoursPrimary ? (
                        <div className="flex items-start gap-2 text-sm text-white/62">
                          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                          <div>
                            {settings.businessHoursLabel ? (
                              <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                                {settings.businessHoursLabel}
                              </p>
                            ) : null}
                            <p>{settings.businessHoursPrimary}</p>
                            {settings.businessHoursSecondary ? (
                              <p>{settings.businessHoursSecondary}</p>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

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
                    {aboutLabel}
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
      </div>
    </header>
  );
}
