import { cache } from "react";

import {
  browserLanguageFallbackLocale,
  defaultLocale,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { getFreshSiteSettings, getSiteSettings } from "@/lib/strapi";

function normalizeEnabledLocales(locales: readonly Locale[] | undefined) {
  const normalized = (locales ?? []).filter(
    (locale, index, array): locale is Locale =>
      isLocale(locale) && array.indexOf(locale) === index,
  );

  return normalized.length ? normalized : [browserLanguageFallbackLocale];
}

export const getEnabledLocales = cache(async () => {
  const settings =
    (await getSiteSettings(defaultLocale)) ??
    (await getSiteSettings(browserLanguageFallbackLocale));

  return normalizeEnabledLocales(settings?.languageSwitcherLocales);
});

export async function getFreshEnabledLocales() {
  const settings =
    (await getFreshSiteSettings(defaultLocale)) ??
    (await getFreshSiteSettings(browserLanguageFallbackLocale));

  return normalizeEnabledLocales(settings?.languageSwitcherLocales);
}

export function getPreferredLocale(enabledLocales: readonly Locale[]) {
  return (
    enabledLocales.find((locale) => locale === browserLanguageFallbackLocale) ??
    enabledLocales[0] ??
    browserLanguageFallbackLocale
  );
}

export async function getEnabledLocaleStaticParams() {
  return (await getEnabledLocales()).map((locale) => ({ locale }));
}

export async function getLocalizedStaticParams(
  getEntries: (locale: Locale) => Promise<Array<{ slug: string }>>,
) {
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of await getEnabledLocales()) {
    const entries = await getEntries(locale);
    params.push(...entries.map((entry) => ({ locale, slug: entry.slug })));
  }

  return params;
}
