"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

type NavItem = {
  href: string;
  label: string;
  matchPaths?: string[];
};

const aboutLabelFallbackByLocale: Record<Locale, string> = {
  en: "About",
  uk: "Про нас",
  ru: "О нас",
  pl: "O nas",
};

const blogLabelFallbackByLocale: Record<Locale, string> = {
  en: "Blog",
  uk: "Блог",
  ru: "Блог",
  pl: "Blog",
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

function isRouteActive(pathname: string, matchPaths: string[] = []) {
  return matchPaths.some((matchPath) => pathname === matchPath || pathname.startsWith(`${matchPath}/`));
}

function getNavLinkClassName(isActive: boolean, mobile = false) {
  return [
    "nav-link",
    mobile ? "nav-link-mobile" : "nav-link-desktop whitespace-nowrap",
    isActive ? "nav-link-active" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function SiteHeader({ locale, settings }: Props) {
  const homeHref = withLocale(locale);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const socialLinks = settings.socialLinks ?? [];
  const aboutLabel = settings.navAboutLabel || aboutLabelFallbackByLocale[locale];
  const blogLabel = settings.navBlogLabel || blogLabelFallbackByLocale[locale];
  const navLinks: NavItem[] = [
    {
      href: withLocale(locale, "/categories"),
      label: settings.navCategoriesLabel,
      matchPaths: [withLocale(locale, "/categories")],
    },
    {
      href: withLocale(locale, "/catalog"),
      label: settings.navCatalogLabel,
      matchPaths: [withLocale(locale, "/catalog"), withLocale(locale, "/products")],
    },
    {
      href: withLocale(locale, "/projects"),
      label: settings.navProjectsLabel,
      matchPaths: [withLocale(locale, "/projects")],
    },
    {
      href: `${homeHref}#process`,
      label: settings.navProcessLabel,
    },
    {
      href: withLocale(locale, "/about"),
      label: aboutLabel,
      matchPaths: [withLocale(locale, "/about")],
    },
    {
      href: withLocale(locale, "/blogs"),
      label: blogLabel,
      matchPaths: [withLocale(locale, "/blogs")],
    },
    {
      href: `${homeHref}#contact`,
      label: settings.navContactLabel,
    },
  ];

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/8 bg-[var(--color-surface-strong)] text-white">
        <div className="site-container flex h-[var(--site-topbar-height)] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5 text-[11px] text-white/50">
            <a
              href={toPhoneHref(settings.contactPhone)}
              className="inline-flex min-w-0 items-center gap-1.5 transition-colors hover:text-white"
            >
              <span aria-hidden="true" className="text-xs leading-none text-[var(--color-primary)]">
                📞
              </span>
              <span className="truncate">{settings.contactPhone}</span>
            </a>
            {settings.businessHoursPrimary ? (
              <span className="hidden items-center gap-1.5 sm:flex">
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

      <div className="border-b border-[var(--color-border)] bg-[color:rgba(255,254,245,0.95)] shadow-[0_6px_24px_rgba(0,0,0,0.14)] backdrop-blur-sm">
        <div className="site-container flex h-[var(--site-nav-height)] items-center justify-between gap-4">
          <Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <span className="font-display text-[13px] font-bold text-white">K</span>
            </div>
            <div className="min-w-0">{renderBrandName(settings.siteName)}</div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navLinks.map((item) => {
              const isActive = isRouteActive(pathname, item.matchPaths);

              return (
                <Link
                  key={item.href}
                  className={getNavLinkClassName(isActive)}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
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
                className="flex cursor-pointer items-center p-2 text-[var(--color-foreground)]"
              >
                {mobileMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
              {mobileMenuOpen ? (
                <div className="absolute right-0 top-full mt-3 flex w-[min(23rem,calc(100vw-2rem))] flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[0_22px_48px_rgba(20,18,16,0.16)]">
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

                  {navLinks.map((item) => {
                    const isActive = isRouteActive(pathname, item.matchPaths);

                    return (
                      <Link
                        key={item.href}
                        className={getNavLinkClassName(isActive, true)}
                        href={item.href}
                        onClick={closeMobileMenu}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="nav-link-mobile-dot" aria-hidden="true" />
                        {item.label}
                      </Link>
                    );
                  })}
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
