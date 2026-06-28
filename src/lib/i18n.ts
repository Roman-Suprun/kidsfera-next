export const locales = ["en", "uk", "ru", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
  pl: "Polski",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  uk: "🇺🇦",
  ru: "🇷🇺",
  pl: "🇵🇱",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromHeader(headerValue: string | null): Locale {
  if (!headerValue) {
    return defaultLocale;
  }

  const requested = headerValue
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .map((part) => part?.split("-")[0])
    .find((part): part is Locale => Boolean(part) && isLocale(part));

  return requested ?? defaultLocale;
}

export function withLocale(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}
