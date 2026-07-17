import Link from "next/link";

import { SocialLinkIcon } from "@/components/social-link-icon";
import { withLocale, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/strapi";

type Props = {
  locale: Locale;
  settings: SiteSettings;
};

const footerCopy: Record<
  Locale,
  {
    follow: string;
    hoursFallback: string;
  }
> = {
  en: {
    follow: "Follow us",
    hoursFallback: "Working Hours",
  },
  uk: {
    follow: "Ми в соцмережах",
    hoursFallback: "Графік роботи",
  },
  ru: {
    follow: "Мы в соцсетях",
    hoursFallback: "График работы",
  },
  pl: {
    follow: "Social media",
    hoursFallback: "Godziny pracy",
  },
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:|#)/i.test(href);
}

function renderBrandName(name: string) {
  const cutIndex = Math.max(1, name.length - 5);

  return (
    <span className="font-display text-lg font-bold text-white tracking-tight">
      {name.slice(0, cutIndex)}
      <span className="text-[var(--color-primary)]">{name.slice(cutIndex)}</span>
    </span>
  );
}

function splitHours(settings: SiteSettings) {
  const primary = settings.businessHoursPrimary?.trim();
  const secondaryParts = settings.businessHoursSecondary
    ?.split("·")
    .map((part) => part.trim())
    .filter(Boolean) ?? [];

  return {
    primary,
    secondary: secondaryParts[0] ?? null,
    tertiary: secondaryParts[1] ?? null,
  };
}

export function SiteFooter({ locale, settings }: Props) {
  const copy = footerCopy[locale];
  const socialLinks = settings.socialLinks ?? [];
  const footerLinkGroups = settings.footerLinkGroups ?? [];
  const footerBadges = settings.footerBadges ?? [];
  const hours = splitHours(settings);

  return (
    <footer className="bg-[var(--color-surface-strong)] py-12 text-white">
      <div className="site-container">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div className="max-w-xs">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                <span className="font-display text-xs font-bold text-white">K</span>
              </div>
              {renderBrandName(settings.siteName)}
            </div>

            {settings.footerDescription ? (
              <p className="mb-5 max-w-xs text-xs text-white/40">
                {settings.footerDescription}
              </p>
            ) : null}

            {hours.primary ? (
              <div className="mb-5">
                <p className="mb-2 text-[10px] uppercase tracking-widest text-white/30">
                  {settings.businessHoursLabel || copy.hoursFallback}
                </p>
                <p className="text-xs text-white/60">{hours.primary}</p>
                {hours.secondary ? (
                  <p className="text-xs text-white/60">{hours.secondary}</p>
                ) : null}
                {hours.tertiary ? (
                  <p className="text-xs text-white/30">{hours.tertiary}</p>
                ) : null}
              </div>
            ) : null}

            {socialLinks.length ? (
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-white/30">
                  {copy.follow}
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={`${social.platform}-${social.href}-footer`}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/8 text-white/50 transition-all hover:bg-white/15 hover:text-white"
                    >
                      <SocialLinkIcon platform={social.platform} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {footerLinkGroups.length ? (
            <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
              {footerLinkGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
                    {group.title}
                  </p>
                  <div className="grid gap-1.5">
                    {group.items.map((item) => {
                      if (!item.href) {
                        return (
                          <p key={item.label} className="text-white/60">
                            {item.label}
                          </p>
                        );
                      }

                      if (isExternalHref(item.href)) {
                        return (
                          <a
                            key={`${group.title}-${item.label}`}
                            href={item.href}
                            className="footer-link text-white/60"
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          >
                            {item.label}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={`${group.title}-${item.label}`}
                          href={withLocale(locale, item.href)}
                          className="footer-link text-white/60"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
          <p className="text-xs text-white/30">
            {settings.footerCopyright ?? `${settings.siteName} ©`}
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            {footerBadges.map((item) => (
              <span
                key={item.label}
                className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/50"
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
