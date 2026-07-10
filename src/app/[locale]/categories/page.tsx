import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import { ArrowRightIcon, ChevronRightIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, locales, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getCategories,
  getCatalogPage,
  getCategoriesPage,
  getProducts,
} from "@/lib/strapi";

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

  const page = await getCategoriesPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.title,
    description: page.description,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function CategoriesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const [page, catalogPage, categories, products] = await Promise.all([
    getCategoriesPage(typedLocale),
    getCatalogPage(typedLocale),
    getCategories(typedLocale),
    getProducts(typedLocale),
  ]);

  if (!page) {
    notFound();
  }

  const productCountByCategory = new Map<string, number>();

  for (const product of products) {
    for (const category of product.categories) {
      productCountByCategory.set(
        category.slug,
        (productCountByCategory.get(category.slug) ?? 0) + 1,
      );
    }
  }

  const itemsLabel = catalogPage?.itemsLabel ?? "items";

  return (
    <div className="page-offset min-h-screen bg-[var(--color-background)]">
      <section className="site-container py-16">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.eyebrow}
          </p>
          <h1 className="font-display mb-4 max-w-[12ch] whitespace-pre-line text-4xl font-bold leading-[1.02] md:text-6xl">
            {page.title}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-muted-foreground)]">
            {page.description}
          </p>
        </div>

        <Link
          className="group mb-8 flex w-full items-center justify-between rounded-2xl bg-[var(--color-surface-strong)] p-6 text-white transition-colors hover:bg-[#2a2520]"
          href={withLocale(typedLocale, "/catalog")}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-xl">
              <span aria-hidden="true">🏆</span>
            </div>
            <div className="text-left">
              <p className="font-display text-base font-bold">
                {page.allProductsLabel}
              </p>
              <p className="mt-0.5 text-sm text-white/50">
                {products.length} {itemsLabel}
              </p>
            </div>
          </div>
          <ArrowRightIcon className="h-5 w-5 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
        </Link>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = productCountByCategory.get(category.slug) ?? 0;

            return (
              <Link
                key={category.slug}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                href={withLocale(typedLocale, `/catalog?category=${category.slug}`)}
              >
                {category.imageUrl ? (
                  <Image
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={category.imageUrl}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute right-4 top-4">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: category.themeColor }}
                  >
                    {count}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-display mb-1 text-xl font-bold text-white">
                    {category.name}
                  </h2>
                  <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                    {category.cardDescription}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-white/40 transition-colors group-hover:text-white/80">
                    <span className="text-xs font-medium">{page.viewCatalogLabel}</span>
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
