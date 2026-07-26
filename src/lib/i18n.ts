export const locales = ["en", "uk", "ru", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const browserLanguageFallbackLocale: Locale = "uk";

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

export const defaultItemsLabelByLocale: Record<Locale, string> = {
  en: "items",
  uk: "товарів",
  ru: "товаров",
  pl: "pozycji",
};

const localePathPattern = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromHeader(
  headerValue: string | null,
  supportedLocales: readonly Locale[] = locales,
  fallbackLocale: Locale = browserLanguageFallbackLocale,
): Locale {
  const enabledLocales = supportedLocales.filter(
    (locale, index, array) => array.indexOf(locale) === index,
  );
  const resolvedFallback =
    enabledLocales.find((locale) => locale === fallbackLocale) ??
    enabledLocales[0] ??
    fallbackLocale;

  if (!headerValue) {
    return resolvedFallback;
  }

  const requested = headerValue
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .map((part) => part?.split("-")[0])
    .find(
      (part): part is Locale =>
        Boolean(part) && isLocale(part) && enabledLocales.includes(part),
    );

  return requested ?? resolvedFallback;
}

export function withLocale(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function stripLocaleFromPath(pathname: string): string {
  return pathname.replace(localePathPattern, "") || "/";
}
