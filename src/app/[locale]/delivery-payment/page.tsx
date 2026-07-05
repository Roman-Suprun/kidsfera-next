import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { DeliveryPaymentTermsPage } from "@/components/delivery-payment-terms-page";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getBaseSiteUrl, getDeliveryPaymentPage } from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = await getDeliveryPaymentPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.title,
    description: page.subtitle,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function DeliveryPaymentPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const page = await getDeliveryPaymentPage(typedLocale);

  if (!page) {
    notFound();
  }

  return <DeliveryPaymentTermsPage locale={typedLocale} page={page} />;
}
