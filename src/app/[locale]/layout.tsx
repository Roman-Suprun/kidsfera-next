import { headers } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  getEnabledLocales,
  getPreferredLocale,
  replaceLocaleInPath,
} from "@/lib/locale-routing";
import { getSiteSettings } from "@/lib/strapi";

export const dynamic = "force-dynamic";

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
    const headerStore = await headers();
    const pathname = headerStore.get("x-kidsfera-pathname") ?? `/${typedLocale}`;
    const search = headerStore.get("x-kidsfera-search") ?? "";
    const fallbackLocale = getPreferredLocale(enabledLocales);

    permanentRedirect(`${replaceLocaleInPath(pathname, typedLocale, fallbackLocale)}${search}`);
  }

  const settings = await getSiteSettings(typedLocale);

  if (!settings) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={typedLocale} settings={settings} />
      <main>{children}</main>
      <SiteFooter locale={typedLocale} settings={settings} />
    </>
  );
}
