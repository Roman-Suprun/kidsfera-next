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
    .map((part, index) => {
      const [tag, ...parameters] = part.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const quality = qualityParameter
        ? Number(qualityParameter.trim().slice(2))
        : 1;

      return {
        locale: tag?.split("-")[0],
        quality: Number.isFinite(quality) && quality >= 0 && quality <= 1 ? quality : 0,
        index,
      };
    })
    .filter(
      (candidate): candidate is { locale: Locale; quality: number; index: number } =>
        Boolean(candidate.locale) &&
        candidate.quality > 0 &&
        isLocale(candidate.locale) &&
        enabledLocales.includes(candidate.locale),
    )
    .sort((left, right) => right.quality - left.quality || left.index - right.index)
    .at(0)?.locale;

  return requested ?? resolvedFallback;
}

export function withLocale(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function stripLocaleFromPath(pathname: string): string {
  return pathname.replace(localePathPattern, "") || "/";
}
