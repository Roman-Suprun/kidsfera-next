import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal-document-page";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getBaseSiteUrl, getGdprPage } from "@/lib/strapi";

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

  const page = await getGdprPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.title,
    description: page.subtitle,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function GdprPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const page = await getGdprPage(typedLocale);

  if (!page) {
    notFound();
  }

  return <LegalDocumentPage page={page} />;
}
