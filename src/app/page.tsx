import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { browserLanguageFallbackLocale, getLocaleFromHeader } from "@/lib/i18n";
import { getFreshSiteSettings } from "@/lib/strapi";

export default async function IndexPage() {
  const headerStore = await headers();
  const settings = await getFreshSiteSettings(browserLanguageFallbackLocale);
  const enabledLocales =
    settings?.languageSwitcherLocales.length
      ? settings.languageSwitcherLocales
      : [browserLanguageFallbackLocale];
  const locale = getLocaleFromHeader(
    headerStore.get("accept-language"),
    enabledLocales,
    browserLanguageFallbackLocale,
  );

  redirect(`/${locale}`);
}
