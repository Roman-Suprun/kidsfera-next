import Link from "next/link";

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
    <span
      className="text-lg font-bold tracking-tight text-white"
      style={{ fontFamily: "'Unbounded', sans-serif" }}
    >
      {name.slice(0, cutIndex)}
      <span className="text-[var(--color-primary)]">{name.slice(cutIndex)}</span>
    </span>
  );
}

export function SiteFooter({ locale, settings }: Props) {
  const homeHref = withLocale(locale);

  return (
    <footer className="bg-[var(--color-surface-strong)] py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)]">
                <span
                  className="text-xs font-bold text-white"
                  style={{ fontFamily: "'Unbounded', sans-serif" }}
                >
                  K
                </span>
              </div>
              {renderBrandName(settings.siteName)}
            </div>
            {settings.footerDescription ? (
              <p className="max-w-xs text-xs text-white/40">
                {settings.footerDescription}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">Products</p>
              <div className="grid gap-1.5">
                <Link className="footer-link text-white/60" href={withLocale(locale, "/categories")}>
                  {settings.navCategoriesLabel}
                </Link>
                <Link className="footer-link text-white/60" href={withLocale(locale, "/catalog")}>
                  {settings.navCatalogLabel}
                </Link>
                <Link className="footer-link text-white/60" href={`${homeHref}#projects`}>
                  {settings.navProjectsLabel}
                </Link>
                <Link className="footer-link text-white/60" href={`${homeHref}#process`}>
                  {settings.navProcessLabel}
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">Company</p>
              <div className="grid gap-1.5">
                <Link className="footer-link text-white/60" href={homeHref}>
                  {settings.siteName}
                </Link>
                <Link className="footer-link text-white/60" href={`${homeHref}#contact`}>
                  {settings.navContactLabel}
                </Link>
                {settings.siteTagline ? <p className="text-white/60">{settings.siteTagline}</p> : null}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">Contact</p>
              <div className="grid gap-1.5">
                <a className="footer-link text-white/60" href={`mailto:${settings.contactEmail}`}>
                  {settings.contactEmail}
                </a>
                <a className="footer-link text-white/60" href={`tel:${settings.contactPhone}`}>
                  {settings.contactPhone}
                </a>
                <p className="text-white/60">{settings.contactAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
          <p className="text-xs text-white/30">
            {settings.footerCopyright ?? `${settings.siteName} ©`}
          </p>
          <div className="flex gap-3">
            {["EN 1176", "CE", "ISO 9001", "ASTM F1292"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white/50"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
