import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArrowRightIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { ProductGallery } from "@/components/product-gallery";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getProductBySlug,
  getProductPageLabels,
  getProducts,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

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
  const [product, labels, products] = await Promise.all([
    getProductBySlug(typedLocale, slug),
    getProductPageLabels(typedLocale),
    getProducts(typedLocale),
  ]);

  if (!product || !labels) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) => item.slug !== product.slug && item.category?.slug === product.category?.slug,
    )
    .slice(0, 3);

  return (
    <section className="site-container section-space">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
        <Link href={withLocale(typedLocale)}>{typedLocale.toUpperCase()}</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link href={withLocale(typedLocale, "/catalog")}>Catalog</Link>
        {product.category ? (
          <>
            <ChevronRightIcon className="h-4 w-4" />
            <Link href={withLocale(typedLocale, `/catalog?category=${product.category.slug}`)}>
              {product.category.name}
            </Link>
          </>
        ) : null}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <ProductGallery images={product.gallery} productName={product.name} />

        <div className="flex flex-col">
          {product.category ? (
            <span
              className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: product.category.themeColor }}
            >
              {product.category.name}
            </span>
          ) : null}
          <h1 className="display-title mt-5 text-[clamp(2rem,4vw,3.5rem)]">{product.name}</h1>
          <p className="mt-4 text-xl font-bold text-[var(--color-primary)]">{product.priceLabel}</p>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {labels.priceOnRequestLabel}
          </p>
          <p className="mt-6 text-base leading-8 text-[var(--color-muted-foreground)]">
            {product.description}
          </p>

          <div className="soft-panel mt-8">
            <p className="small-label">{labels.specsLabel}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  {labels.ageLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{product.ageRange}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  {labels.sizeLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{product.size}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  {labels.capacityLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{product.capacity}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  {labels.materialLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{product.material}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                  {labels.leadLabel}
                </p>
                <p className="mt-2 text-sm font-semibold">{product.leadTime}</p>
              </div>
            </div>
          </div>

          {product.certifications.length ? (
            <div className="mt-8">
              <p className="small-label">{labels.certifiedByLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.certifications.map((certification) => (
                  <span
                    key={certification.label}
                    className="rounded-full bg-[var(--color-surface-strong)] px-3 py-1 text-xs font-bold text-white"
                  >
                    {certification.label}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="btn-primary" href={withLocale(typedLocale, "/catalog")}>
              {labels.requestQuoteLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              className="btn-secondary"
              href={
                product.category
                  ? withLocale(typedLocale, `/catalog?category=${product.category.slug}`)
                  : withLocale(typedLocale, "/catalog")
              }
            >
              {labels.backToCatalogLabel}
            </Link>
          </div>
        </div>
      </div>

      {relatedProducts.length ? (
        <div className="mt-20">
          <h2 className="section-title text-[clamp(1.8rem,3vw,2.4rem)]">{labels.relatedTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                className="card-surface overflow-hidden transition hover:-translate-y-1"
                href={withLocale(typedLocale, `/products/${item.slug}`)}
              >
                <div className="aspect-video bg-[var(--color-panel)]">
                  {item.gallery[0] ? (
                    <img
                      alt={item.gallery[0].alt}
                      className="h-full w-full object-cover"
                      src={item.gallery[0].url}
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="brand-title text-lg">{item.name}</h3>
                  <p className="mt-2 text-sm text-[var(--color-primary)]">{item.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
