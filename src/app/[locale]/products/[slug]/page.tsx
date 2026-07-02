import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRightIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@/components/icons";
import { ProductGallery } from "@/components/product-gallery";
import { QuoteRequestLink } from "@/components/quote-request-link";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getProductBySlug,
  getProductPageLabels,
  getProducts,
  getSiteSettings,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const homeBreadcrumbLabels: Record<Locale, string> = {
  en: "Home",
  uk: "Головна",
  ru: "Главная",
  pl: "Start",
};

const productRatingCopy: Record<
  Locale,
  {
    score: string;
    reviews: string;
  }
> = {
  en: { score: "4.9 / 5.0", reviews: "47 reviews" },
  uk: { score: "4.9 / 5.0", reviews: "47 відгуків" },
  ru: { score: "4.9 / 5.0", reviews: "47 отзывов" },
  pl: { score: "4.9 / 5.0", reviews: "47 opinii" },
};

const quotePrefillCopy: Record<
  Locale,
  {
    intro: string;
    productLabel: string;
    categoryLabel: string;
    priceLabel: string;
  }
> = {
  en: {
    intro: "Hi, I'd like to request a quote for this product.",
    productLabel: "Product",
    categoryLabel: "Category",
    priceLabel: "Budget range",
  },
  uk: {
    intro: "Вітаю, хочу отримати комерційну пропозицію для цього продукту.",
    productLabel: "Продукт",
    categoryLabel: "Категорія",
    priceLabel: "Орієнтовний бюджет",
  },
  ru: {
    intro: "Здравствуйте, хочу запросить коммерческое предложение для этого продукта.",
    productLabel: "Продукт",
    categoryLabel: "Категория",
    priceLabel: "Ориентир по бюджету",
  },
  pl: {
    intro: "Dzień dobry, chciałbym otrzymać ofertę dla tego produktu.",
    productLabel: "Produkt",
    categoryLabel: "Kategoria",
    priceLabel: "Orientacyjny budżet",
  },
};

function buildQuotePrefillMessage(
  locale: Locale,
  product: Awaited<ReturnType<typeof getProductBySlug>>,
) {
  if (!product) {
    return "";
  }

  const copy = quotePrefillCopy[locale];

  return [
    copy.intro,
    "",
    `${copy.productLabel}: ${product.name}`,
    `${copy.categoryLabel}: ${product.category?.name ?? "-"}`,
    `${copy.priceLabel}: ${product.priceLabel}`,
  ].join("\n");
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const product = await getProductBySlug(locale, slug);

  if (!product) {
    return {};
  }

  return buildMetadata(product.seo, {
    title: product.name,
    description: product.shortDescription,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const [product, labels, products, settings] = await Promise.all([
    getProductBySlug(typedLocale, slug),
    getProductPageLabels(typedLocale),
    getProducts(typedLocale),
    getSiteSettings(typedLocale),
  ]);

  if (!product || !labels || !settings) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) => item.slug !== product.slug && item.category?.slug === product.category?.slug,
    )
    .slice(0, 3);
  const quotePrefillMessage = buildQuotePrefillMessage(typedLocale, product);
  const productColor = product.category?.themeColor ?? "var(--color-primary)";
  const ratingCopy = productRatingCopy[typedLocale];

  return (
    <section className="min-h-screen bg-[var(--color-background)] pt-16">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--color-muted-foreground)]">
          <Link className="transition-colors hover:text-[var(--color-foreground)]" href={withLocale(typedLocale)}>
            {settings.siteName || homeBreadcrumbLabels[typedLocale]}
          </Link>
          <ChevronRightIcon className="h-3 w-3" />
          <Link
            className="transition-colors hover:text-[var(--color-foreground)]"
            href={withLocale(typedLocale, "/catalog")}
          >
            {settings.navCatalogLabel}
          </Link>
          {product.category ? (
            <>
              <ChevronRightIcon className="h-3 w-3" />
              <Link
                className="transition-colors hover:text-[var(--color-foreground)]"
                href={withLocale(typedLocale, `/catalog?category=${product.category.slug}`)}
              >
                {product.category.name}
              </Link>
            </>
          ) : null}
          <ChevronRightIcon className="h-3 w-3" />
          <span className="font-medium text-[var(--color-foreground)]">{product.name}</span>
        </div>

        <div className="mb-16 grid gap-10 md:grid-cols-2">
          <ProductGallery images={product.gallery} productName={product.name} />

          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {product.category ? (
                <span
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: product.category.themeColor }}
                >
                  {product.category.name}
                </span>
              ) : null}
              {product.certifications.map((certification) => (
                <span
                  key={certification.label}
                  className="inline-flex rounded-full bg-[var(--color-panel)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted-foreground)]"
                >
                  {certification.label}
                </span>
              ))}
            </div>

            <h1 className="font-display mb-2 text-2xl font-bold md:text-3xl">{product.name}</h1>

            <div className="mb-5 flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {ratingCopy.score} · {ratingCopy.reviews}
              </span>
            </div>

            <div className="mb-6">
              <p className="font-display text-2xl font-bold" style={{ color: productColor }}>
                {product.priceLabel}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                {labels.priceOnRequestLabel}
              </p>
            </div>

            <p className="mb-8 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {product.description}
            </p>

            <div className="mb-8 rounded-2xl bg-[var(--color-panel)] p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                {labels.specsLabel}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {labels.ageLabel}
                  </span>
                  <span className="text-sm font-semibold">{product.ageRange}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {labels.sizeLabel}
                  </span>
                  <span className="text-sm font-semibold">{product.size}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {labels.capacityLabel}
                  </span>
                  <span className="text-sm font-semibold">{product.capacity}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {labels.materialLabel}
                  </span>
                  <span className="text-sm font-semibold">{product.material}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    {labels.leadLabel}
                  </span>
                  <span className="text-sm font-semibold">{product.leadTime}</span>
                </div>
              </div>
            </div>

            {product.certifications.length ? (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  {labels.certifiedByLabel}:
                </span>
                {product.certifications.map((certification) => (
                  <span
                    key={`${certification.label}-cert`}
                    className="rounded-full bg-[var(--color-surface-strong)] px-2.5 py-1 text-[10px] font-bold text-white"
                  >
                    {certification.label}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="flex gap-3">
              <QuoteRequestLink
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
                locale={typedLocale}
                message={quotePrefillMessage}
                style={{ backgroundColor: productColor }}
              >
                {labels.requestQuoteLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </QuoteRequestLink>
              <Link
                className="inline-flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-2xl bg-[var(--color-panel)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-panel-strong)]"
                href={
                  product.category
                    ? withLocale(typedLocale, `/catalog?category=${product.category.slug}`)
                    : withLocale(typedLocale, "/catalog")
                }
              >
                <span className="sr-only">{labels.backToCatalogLabel}</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length ? (
          <div>
            <h2 className="font-display mb-6 text-xl font-bold">{labels.relatedTitle}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.slug}
                  className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all hover:border-[color:rgba(255,69,0,0.3)] hover:shadow-md"
                  href={withLocale(typedLocale, `/products/${item.slug}`)}
                >
                  <div className="relative aspect-video bg-[var(--color-panel)]">
                    {item.gallery[0] ? (
                      <Image
                        alt={item.gallery[0].alt}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        src={item.gallery[0].url}
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display mb-1 text-xs font-bold">{item.name}</h3>
                    <p className="text-xs font-bold text-[var(--color-primary)]">{item.priceLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
