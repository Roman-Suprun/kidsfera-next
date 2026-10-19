import { notFound, redirect } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildSiteSchemas, StructuredData } from "@/components/structured-data";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  getEnabledLocales,
  getPreferredLocale,
} from "@/lib/locale-routing";
import { getSiteOrigin, getSiteSettings } from "@/lib/strapi";

// The CMS fetches below revalidate every minute, while a Strapi webhook can
// invalidate this layout immediately after a publish or edit.
export const revalidate = 60;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const enabledLocales = await getEnabledLocales();

  if (!enabledLocales.includes(typedLocale)) {
    const fallbackLocale = getPreferredLocale(enabledLocales);

    // CMS language availability can change, so this must not be cached as a
    // permanent redirect. The browser language is never consulted for an
    // explicit locale URL.
    redirect(`/${fallbackLocale}`);
  }

  const settings = await getSiteSettings(typedLocale);

  if (!settings) {
    notFound();
  }

  return (
    <>
      <StructuredData data={buildSiteSchemas(settings, typedLocale, getSiteOrigin())} />
      <SiteHeader locale={typedLocale} settings={settings} />
      <main>{children}</main>
      <SiteFooter locale={typedLocale} settings={settings} />
    </>
  );
}
