import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, locales, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getCategories,
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
  const [page, categories, products] = await Promise.all([
    getCategoriesPage(typedLocale),
    getCategories(typedLocale),
    getProducts(typedLocale),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <section className="site-container section-space">
      <div className="max-w-3xl">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="display-title whitespace-pre-line">{page.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--color-muted-foreground)]">
          {page.description}
        </p>
      </div>

      <div className="mt-10">
        <Link className="card-surface flex items-center justify-between gap-6 p-6" href={withLocale(typedLocale, "/catalog")}>
          <div>
            <div className="brand-title text-xl">{page.allProductsLabel}</div>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              {products.length} items
            </p>
          </div>
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const count = products.filter((product) => product.category?.slug === category.slug).length;

          return (
            <Link
              key={category.slug}
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border)]"
              href={withLocale(typedLocale, `/catalog?category=${category.slug}`)}
            >
              <div className="aspect-[4/3]">
                <img
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={category.imageUrl}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="mb-3 inline-flex rounded-full bg-white/16 px-3 py-1 text-xs font-bold backdrop-blur">
                  {count}
                </div>
                <h2 className="brand-title text-2xl">{category.name}</h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-white/72">
                  {category.cardDescription}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  {page.viewCatalogLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
