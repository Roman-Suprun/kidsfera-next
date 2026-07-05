import Link from "next/link";

import { SocialLinkIcon } from "@/components/social-link-icon";
import { withLocale, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/strapi";

type Props = {
  locale: Locale;
  settings: SiteSettings;
};

type FooterItem = {
  label: string;
  href?: string;
};

const footerCopy: Record<
  Locale,
  {
    follow: string;
    hoursFallback: string;
    productsTitle: string;
    companyTitle: string;
    legalTitle: string;
    productItems: string[];
    companyItems: string[];
    legalItems: FooterItem[];
  }
> = {
  en: {
    follow: "Follow us",
    hoursFallback: "Working Hours",
    productsTitle: "Products",
    companyTitle: "Company",
    legalTitle: "Legal",
    productItems: ["Labyrinths", "Playgrounds", "Climbing Walls", "Ball Pits"],
    companyItems: ["About Us", "Our Factory", "Projects", "Certifications"],
    legalItems: [
      { label: "Privacy Policy" },
      { label: "Terms of Sale", href: "/delivery-payment" },
      { label: "EN 1176 Docs" },
      { label: "GDPR" },
    ],
  },
  uk: {
    follow: "Ми в соцмережах",
    hoursFallback: "Графік роботи",
    productsTitle: "Продукція",
    companyTitle: "Компанія",
    legalTitle: "Документи",
    productItems: ["Лабіринти", "Майданчики", "Скелодроми", "Сухі басейни"],
    companyItems: ["Про нас", "Наш завод", "Проєкти", "Сертифікати"],
    legalItems: [
      { label: "Конфіденційність" },
      { label: "Умови продажу", href: "/delivery-payment" },
      { label: "EN 1176" },
      { label: "GDPR" },
    ],
  },
  ru: {
    follow: "Мы в соцсетях",
    hoursFallback: "График работы",
    productsTitle: "Продукция",
    companyTitle: "Компания",
    legalTitle: "Документы",
    productItems: ["Лабиринты", "Площадки", "Скалодромы", "Сухие бассейны"],
    companyItems: ["О нас", "Наш завод", "Проекты", "Сертификаты"],
    legalItems: [
      { label: "Конфиденциальность" },
      { label: "Условия продажи", href: "/delivery-payment" },
      { label: "EN 1176" },
      { label: "GDPR" },
    ],
  },
  pl: {
    follow: "Social media",
    hoursFallback: "Godziny pracy",
    productsTitle: "Produkty",
    companyTitle: "Firma",
    legalTitle: "Dokumenty",
    productItems: ["Labirynty", "Place zabaw", "Ścianki", "Suche baseny"],
    companyItems: ["O nas", "Nasza fabryka", "Realizacje", "Certyfikaty"],
    legalItems: [
      { label: "Polityka prywatności" },
      { label: "Warunki sprzedaży", href: "/delivery-payment" },
      { label: "EN 1176" },
      { label: "RODO" },
    ],
  },
};

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

          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
                {copy.productsTitle}
              </p>
              <div className="grid gap-1.5">
                {copy.productItems.map((item) => (
                  <p key={item} className="text-white/60">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
                {copy.companyTitle}
              </p>
              <div className="grid gap-1.5">
                {copy.companyItems.map((item) => {
                  return (
                    <p key={item} className="text-white/60">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/30">
                {copy.legalTitle}
              </p>
              <div className="grid gap-1.5">
                {copy.legalItems.map((item) => (
                  item.href ? (
                    <Link
                      key={item.label}
                      href={withLocale(locale, item.href)}
                      className="footer-link text-white/60"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p key={item.label} className="text-white/60">
                      {item.label}
                    </p>
                  )
                ))}
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
