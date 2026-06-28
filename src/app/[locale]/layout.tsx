import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, type Locale } from "@/lib/i18n";
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

  const settings = await getSiteSettings(locale as Locale);

  if (!settings) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={locale as Locale} settings={settings} />
      <main>{children}</main>
      <SiteFooter locale={locale as Locale} settings={settings} />
    </>
  );
}
