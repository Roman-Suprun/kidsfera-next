import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/catalog-browser";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getCatalogPage,
  getCategories,
  getProducts,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = await getCatalogPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.title,
    description: page.description ?? page.title,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function CatalogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const { category } = await searchParams;
  const typedLocale = locale as Locale;
  const [page, categories, products] = await Promise.all([
    getCatalogPage(typedLocale),
    getCategories(typedLocale),
    getProducts(typedLocale),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-[var(--color-background)] pt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              {page.filterByLabel}
            </p>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              {page.title}
            </h1>
          </div>
        </div>

        <CatalogBrowser
          categories={categories}
          initialCategory={category ?? null}
          locale={typedLocale}
          page={page}
          products={products}
        />
      </div>
    </section>
  );
}
