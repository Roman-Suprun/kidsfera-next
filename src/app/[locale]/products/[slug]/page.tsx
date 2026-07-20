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
import { FeedbackSection } from "@/components/feedback-section";
import { ProductGallery } from "@/components/product-gallery";
import { QuoteRequestLink } from "@/components/quote-request-link";
import { StrapiRichText } from "@/components/strapi-rich-text";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getProductFeedback,
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
    noReviews: string;
    reviewsLabel: (count: number) => string;
  }
> = {
  en: {
    noReviews: "No approved reviews yet",
    reviewsLabel: (count) => `${count} review${count === 1 ? "" : "s"}`,
  },
  uk: {
    noReviews: "Ще немає схвалених відгуків",
    reviewsLabel: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;

      if (mod10 === 1 && mod100 !== 11) {
        return `${count} відгук`;
      }

      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return `${count} відгуки`;
      }

      return `${count} відгуків`;
    },
  },
  ru: {
    noReviews: "Пока нет одобренных отзывов",
    reviewsLabel: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;

      if (mod10 === 1 && mod100 !== 11) {
        return `${count} отзыв`;
      }

      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return `${count} отзыва`;
      }

      return `${count} отзывов`;
    },
  },
  pl: {
    noReviews: "Brak zatwierdzonych opinii",
    reviewsLabel: (count) => `${count} opini${count === 1 ? "a" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "e" : "i"}`,
  },
};

const quotePrefillCopy: Record<
  Locale,
  {
    intro: string;
    productLabel: string;
    categoriesLabel: string;
    priceLabel: string;
  }
> = {
  en: {
    intro: "Hi, I'd like to request a quote for this product.",
    productLabel: "Product",
    categoriesLabel: "Categories",
    priceLabel: "Budget range",
  },
  uk: {
    intro: "Вітаю, хочу отримати комерційну пропозицію для цього продукту.",
    productLabel: "Продукт",
    categoriesLabel: "Категорії",
    priceLabel: "Орієнтовний бюджет",
  },
  ru: {
    intro: "Здравствуйте, хочу запросить коммерческое предложение для этого продукта.",
    productLabel: "Продукт",
    categoriesLabel: "Категории",
    priceLabel: "Ориентир по бюджету",
  },
  pl: {
    intro: "Dzień dobry, chciałbym otrzymać ofertę dla tego produktu.",
    productLabel: "Produkt",
    categoriesLabel: "Kategorie",
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
    `${copy.categoriesLabel}: ${product.categories.map((category) => category.name).join(", ") || "-"}`,
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

  const categoryMatchedProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      item.categories.some((category) =>
        product.categories.some((productCategory) => productCategory.slug === category.slug),
      ),
  );
  const fallbackProducts = products.filter(
    (item) =>
      item.slug !== product.slug &&
      !categoryMatchedProducts.some((matchedProduct) => matchedProduct.slug === item.slug),
  );
  const relatedProducts = [...categoryMatchedProducts, ...fallbackProducts].slice(0, 3);
  const quotePrefillMessage = buildQuotePrefillMessage(typedLocale, product);
  const primaryCategory = product.categories[0] ?? product.category ?? null;
  const productColor = primaryCategory?.themeColor ?? "var(--color-primary)";
  const ratingCopy = productRatingCopy[typedLocale];
  const { feedbacks, summary } = await getProductFeedback(product.documentId);
  const averageStars = summary.averageRating !== null ? Math.max(0, Math.min(5, Math.round(summary.averageRating))) : 0;

  return (
    <section className="page-offset min-h-screen bg-[var(--color-background)]">
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
          {product.categories.map((category) => (
            <div key={`${product.slug}-breadcrumb-${category.slug}`} className="contents">
              <ChevronRightIcon className="h-3 w-3" />
              <Link
                className="transition-colors hover:text-[var(--color-foreground)]"
                href={withLocale(typedLocale, `/catalog?category=${category.slug}`)}
              >
                {category.name}
              </Link>
            </div>
          ))}
          <ChevronRightIcon className="h-3 w-3" />
          <span className="font-medium text-[var(--color-foreground)]">{product.name}</span>
        </div>

        <div className="mb-16 grid gap-10 md:grid-cols-2">
          <ProductGallery images={product.gallery} productName={product.name} />

          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {product.categories.map((category) => (
                <span
                  key={`${product.slug}-${category.slug}`}
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: category.themeColor }}
                >
                  {category.name}
                </span>
              ))}
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
                    className={
                      index < averageStars
                        ? "h-3.5 w-3.5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                        : "h-3.5 w-3.5 text-[var(--color-border)]"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--color-muted-foreground)]">
                {summary.averageRating !== null
                  ? `${summary.averageRating.toFixed(1)} / 5 · ${ratingCopy.reviewsLabel(summary.totalCount)}`
                  : ratingCopy.noReviews}
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

            <StrapiRichText
              className="mb-8 text-sm leading-relaxed text-[var(--color-muted-foreground)]"
              content={product.description}
            />

            <div className="mb-8 rounded-2xl bg-[var(--color-panel)] p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-muted-foreground)]">
                {labels.specsLabel}
              </p>
              <div className="grid grid-cols-2 gap-3">
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
                href={withLocale(typedLocale, "/catalog")}
              >
                <span className="sr-only">{labels.backToCatalogLabel}</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length ? (
          <div className="mt-16">
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

        <div className="mt-16">
          <FeedbackSection
            feedbacks={feedbacks}
            locale={typedLocale}
            summary={summary}
            targetLabel={product.name}
            targetSlug={product.slug}
            targetType="product"
          />
        </div>
      </div>
    </section>
  );
}
