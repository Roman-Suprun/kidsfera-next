import { cache } from "react";

import { defaultLocale, type Locale } from "@/lib/i18n";

type StrapiEnvelope<T> =
  | {
      data: T;
      meta?: Record<string, unknown>;
    }
  | T;

type StrapiEntity = Record<string, unknown> & {
  id?: number;
  documentId?: string;
  attributes?: Record<string, unknown>;
};

export type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  canonicalPath?: string | null;
  ogImageUrl?: string | null;
  noIndex?: boolean | null;
};

type StrapiMedia = {
  id?: number;
  url?: string | null;
  alternativeText?: string | null;
  name?: string | null;
  hash?: string | null;
  updatedAt?: string | null;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  iconKey: "shield" | "wrench" | "zap" | "globe";
};

export type MediaImage = {
  url: string;
  alt: string;
};

export type FeaturedProduct = {
  title: string;
  tagline: string;
  description: string;
  badge: string;
  ctaLabel: string;
  image: MediaImage | null;
  imageAlt: string;
  theme: "orange" | "blue" | "charcoal" | "yellow";
  linkedCategory?: Category | null;
};

export type ProcessStep = {
  stepNumber: string;
  title: string;
  description: string;
  theme: "orange" | "blue" | "charcoal";
};

export type ProcessPhase = {
  title: string;
  subtitle: string;
};

export type ContactItem = {
  label: string;
  value: string;
  type: "phone" | "email" | "address";
};

export type ContactForm = {
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  messageLabel: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  note: string;
};

export type Badge = {
  label: string;
};

export type ImageLink = {
  url: string;
  alt: string;
};

export type SiteSettings = {
  siteName: string;
  siteTagline?: string | null;
  defaultSeo?: Seo | null;
  navCategoriesLabel: string;
  navCatalogLabel: string;
  navProjectsLabel: string;
  navProcessLabel: string;
  navContactLabel: string;
  navCtaLabel: string;
  footerDescription?: string | null;
  footerCopyright?: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
};

export type HomePage = {
  seo?: Seo | null;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  heroQuote?: string | null;
  heroQuoteAttribution?: string | null;
  heroImageUrl: string;
  stats: StatItem[];
  productsSectionEyebrow: string;
  productsSectionTitle: string;
  featuredProducts: FeaturedProduct[];
  features: FeatureItem[];
  processEyebrow: string;
  processTitle: string;
  processTimelineTitle: string;
  processTimelineSubtitle: string;
  processSteps: ProcessStep[];
  processPhases: ProcessPhase[];
  projectsEyebrow: string;
  projectsTitle: string;
  projectsCtaLabel: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
  ctaNote?: string | null;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  contactItems: ContactItem[];
  contactForm?: ContactForm | null;
};

export type CategoriesPage = {
  seo?: Seo | null;
  eyebrow: string;
  title: string;
  description: string;
  allProductsLabel: string;
  viewCatalogLabel: string;
};

export type CatalogPage = {
  seo?: Seo | null;
  eyebrow: string;
  title: string;
  description?: string | null;
  filterByLabel: string;
  categoryLabel: string;
  ageRangeLabel: string;
  allLabel: string;
  noResultsLabel: string;
  viewDetailsLabel: string;
  itemsLabel: string;
  filtersLabel: string;
};

export type ProductPageLabels = {
  galleryLabel?: string | null;
  specsLabel: string;
  ageLabel: string;
  sizeLabel: string;
  capacityLabel: string;
  materialLabel: string;
  leadLabel: string;
  requestQuoteLabel: string;
  backToCatalogLabel: string;
  relatedTitle: string;
  priceOnRequestLabel: string;
  certifiedByLabel: string;
  notFoundTitle: string;
};

export type Category = {
  id?: number;
  documentId?: string;
  name: string;
  slug: string;
  description: string;
  cardDescription: string;
  imageUrl: string;
  themeColor: string;
  emoji?: string | null;
  sortOrder?: number | null;
  featured?: boolean | null;
  seo?: Seo | null;
};

export type Product = {
  id?: number;
  documentId?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  ageRange: string;
  priceLabel: string;
  size: string;
  capacity: string;
  material: string;
  leadTime: string;
  certifications: Badge[];
  gallery: ImageLink[];
  sortOrder?: number | null;
  featured?: boolean | null;
  seo?: Seo | null;
  category?: Category | null;
};

export type Project = {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  subtitle: string;
  imageUrl: string;
  projectType: string;
  sortOrder?: number | null;
  featured?: boolean | null;
};

type RawSeo = Seo & {
  ogImage?: StrapiMedia | null;
};

type RawFeaturedProduct = Omit<FeaturedProduct, "image"> & {
  image?: StrapiMedia | null;
};

type RawHomePage = Omit<HomePage, "seo" | "heroImageUrl" | "featuredProducts"> & {
  seo?: RawSeo | null;
  heroImage?: StrapiMedia | null;
  featuredProducts?: RawFeaturedProduct[];
};

type RawCategoriesPage = Omit<CategoriesPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawCatalogPage = Omit<CatalogPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawSiteSettings = Omit<SiteSettings, "defaultSeo"> & {
  defaultSeo?: RawSeo | null;
};

type RawCategory = Omit<Category, "imageUrl" | "seo"> & {
  image?: StrapiMedia | null;
  seo?: RawSeo | null;
};

type RawImageLink = Omit<ImageLink, "url"> & {
  image?: StrapiMedia | null;
};

type RawProduct = Omit<Product, "gallery" | "seo" | "category"> & {
  gallery?: RawImageLink[];
  seo?: RawSeo | null;
  category?: RawCategory | null;
};

type RawProject = Omit<Project, "imageUrl"> & {
  image?: StrapiMedia | null;
};

export type Testimonial = {
  id?: number;
  documentId?: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  sortOrder?: number | null;
  featured?: boolean | null;
};

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";
const STRAPI_PUBLIC_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? STRAPI_URL.replace("127.0.0.1", "localhost");
const REVALIDATE_SECONDS = 60;
const singleTypeFallbacks: Record<string, string[]> = {
  "/api/site-setting": ["/api/site-settings"],
  "/api/home-page": ["/api/home-pages"],
  "/api/categories-page": ["/api/categories-pages"],
  "/api/catalog-page": ["/api/catalog-pages"],
  "/api/product-page": ["/api/product-pages"],
};

function buildUrl(path: string, query?: URLSearchParams) {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, STRAPI_URL);

  if (query) {
    url.search = query.toString();
  }

  return url.toString();
}

function normalizeValue<T>(value: unknown): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item)) as T;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if ("data" in record && Object.keys(record).every((key) => key === "data" || key === "meta")) {
      return normalizeValue(record.data) as T;
    }

    if ("attributes" in record && record.attributes && typeof record.attributes === "object") {
      return normalizeValue({
        id: record.id,
        documentId: record.documentId,
        ...(record.attributes as Record<string, unknown>),
      }) as T;
    }

    return Object.fromEntries(
      Object.entries(record).map(([key, nestedValue]) => [key, normalizeValue(nestedValue)]),
    ) as T;
  }

  return value as T;
}

function normalizeCollection<T>(payload: StrapiEnvelope<StrapiEntity[]>) {
  const data =
    typeof payload === "object" && payload !== null && "data" in payload
      ? payload.data
      : payload;

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((entry) => normalizeValue<T>(entry)).filter((entry): entry is T => Boolean(entry));
}

function normalizeSingle<T>(payload: StrapiEnvelope<StrapiEntity | null>) {
  const data =
    typeof payload === "object" && payload !== null && "data" in payload
      ? payload.data
      : payload;

  return normalizeValue<T | null>(data as StrapiEntity | null);
}

async function strapiFetch<T>(path: string, query?: URLSearchParams): Promise<T> {
  const requestPaths = [path, ...(singleTypeFallbacks[path] ?? [])];
  let lastError: Error | null = null;

  for (const requestPath of requestPaths) {
    let response: Response;

    try {
      response = await fetch(buildUrl(requestPath, query), {
        next: { revalidate: REVALIDATE_SECONDS },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      lastError = new Error(
        `Strapi request failed for ${requestPath}: ${String(error)}`,
      );
      continue;
    }

    if (response.ok) {
      return (await response.json()) as T;
    }

    if (response.status !== 404 || requestPath === requestPaths.at(-1)) {
      throw new Error(`Strapi request failed for ${requestPath}: ${response.status}`);
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error(`Strapi request failed for ${path}`);
}

function baseQuery(locale: Locale) {
  const query = new URLSearchParams();

  query.set("locale", locale);

  return query;
}

function setPopulate(query: URLSearchParams, key: string, value: string | boolean = true) {
  query.set(key, String(value));
  return query;
}

function sortCollection(query: URLSearchParams) {
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "name:asc");
  return query;
}

function mapSeo(value: unknown): Seo | null {
  const seo = value as RawSeo | null;

  if (!seo) {
    return null;
  }

  return {
    ...seo,
    ogImageUrl: resolveMediaUrl(seo.ogImage),
  };
}

function mapCategory(value: unknown): Category | null {
  const category = value as RawCategory | null;

  if (!category) {
    return null;
  }

  return {
    ...category,
    imageUrl: resolveMediaUrl(category.image) ?? "",
    seo: mapSeo(category.seo),
  };
}

function mapProduct(value: unknown): Product | null {
  const product = value as RawProduct | null;

  if (!product) {
    return null;
  }

  return {
    ...product,
    certifications: Array.isArray(product.certifications)
      ? product.certifications
      : [],
    gallery: Array.isArray(product.gallery)
      ? product.gallery
          .map((entry) => mapImageLink(entry))
          .filter((entry): entry is ImageLink => Boolean(entry))
      : [],
    seo: mapSeo(product.seo),
    category: mapCategory(product.category),
  };
}

function buildAssetUrl(url: string, version?: string | number | null) {
  if (/^https?:\/\//i.test(url)) {
    const absoluteUrl = new URL(url);

    if (version) {
      absoluteUrl.searchParams.set("v", String(version));
    }

    return absoluteUrl.toString();
  }

  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  const assetUrl = new URL(`/api/strapi-media${normalizedPath}`, "http://localhost");

  if (version) {
    assetUrl.searchParams.set("v", String(version));
  }

  return `${assetUrl.pathname}${assetUrl.search}`;
}

function resolveMediaUrl(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const media = value as StrapiMedia;
  const version = media.hash ?? media.updatedAt ?? media.id ?? null;

  return typeof media.url === "string" && media.url.length > 0
    ? buildAssetUrl(media.url, version)
    : null;
}

function resolveMediaAlt(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const media = value as StrapiMedia;

  return media.alternativeText ?? media.name ?? null;
}

function mapImageLink(value: unknown): ImageLink | null {
  const image = value as RawImageLink | null;

  if (!image) {
    return null;
  }

  const url = resolveMediaUrl(image.image);

  if (!url) {
    return null;
  }

  return {
    ...image,
    url,
    alt: image.alt ?? resolveMediaAlt(image.image) ?? "",
  };
}

function mapFeaturedProduct(value: unknown): FeaturedProduct | null {
  const item = value as RawFeaturedProduct | null;

  if (!item) {
    return null;
  }

  const imageUrl = resolveMediaUrl(item.image);

  return {
    ...item,
    image: imageUrl
      ? {
          url: imageUrl,
          alt: item.imageAlt ?? resolveMediaAlt(item.image) ?? "",
        }
      : null,
    linkedCategory: mapCategory(item.linkedCategory),
  };
}

function mapHomePage(value: unknown): HomePage | null {
  const page = value as RawHomePage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
    heroImageUrl: resolveMediaUrl(page.heroImage) ?? "",
    featuredProducts: Array.isArray(page.featuredProducts)
      ? page.featuredProducts
          .map((entry) => mapFeaturedProduct(entry))
          .filter((entry): entry is FeaturedProduct => Boolean(entry))
      : [],
  };
}

function mapProject(value: unknown): Project | null {
  const project = value as RawProject | null;

  if (!project) {
    return null;
  }

  return {
    ...project,
    imageUrl: resolveMediaUrl(project.image) ?? "",
  };
}

function mapCategoriesPage(value: unknown): CategoriesPage | null {
  const page = value as RawCategoriesPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
  };
}

function mapCatalogPage(value: unknown): CatalogPage | null {
  const page = value as RawCatalogPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
  };
}

function mapSiteSettings(value: unknown): SiteSettings | null {
  const settings = value as RawSiteSettings | null;

  if (!settings) {
    return null;
  }

  return {
    ...settings,
    defaultSeo: mapSeo(settings.defaultSeo),
  };
}

export const getSiteSettings = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[defaultSeo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawSiteSettings | null>>(
    "/api/site-setting",
    query,
  );

  return mapSiteSettings(normalizeSingle<RawSiteSettings>(payload));
});

export const getHomePage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[heroImage]", true);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[stats][populate][0]", false);
  setPopulate(query, "populate[stats][populate][0]", false);
  setPopulate(query, "populate[features][populate][0]", false);
  setPopulate(query, "populate[processPhases][populate][0]", false);
  setPopulate(query, "populate[processSteps][populate][0]", false);
  setPopulate(query, "populate[contactItems][populate][0]", false);
  setPopulate(query, "populate[featuredProducts][populate][0]", "image");
  setPopulate(query, "populate[featuredProducts][populate][1]", "linkedCategory");

  const payload = await strapiFetch<StrapiEnvelope<RawHomePage | null>>(
    "/api/home-page",
    query,
  );

  return mapHomePage(normalizeSingle<RawHomePage>(payload));
});

export const getCategoriesPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawCategoriesPage | null>>(
    "/api/categories-page",
    query,
  );

  return mapCategoriesPage(normalizeSingle<RawCategoriesPage>(payload));
});

export const getCatalogPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawCatalogPage | null>>(
    "/api/catalog-page",
    query,
  );

  return mapCatalogPage(normalizeSingle<RawCatalogPage>(payload));
});

export const getProductPageLabels = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  // setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<ProductPageLabels | null>>(
    "/api/product-page",
    query,
  );

  return normalizeSingle<ProductPageLabels>(payload);
});

export const getCategories = cache(async (locale: Locale) => {
  const query = sortCollection(baseQuery(locale));
  setPopulate(query, "populate[image]", true);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawCategory[]>>(
    "/api/categories",
    query,
  );

  return normalizeCollection<RawCategory>(payload).map((entry) => mapCategory(entry)!);
});

export const getProducts = cache(async (locale: Locale) => {
  const query = sortCollection(baseQuery(locale));
  setPopulate(query, "populate[gallery][populate][0]", "image");
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[category][populate][0]", "image");

  const payload = await strapiFetch<StrapiEnvelope<RawProduct[]>>(
    "/api/products",
    query,
  );

  return normalizeCollection<RawProduct>(payload).map((entry) => mapProduct(entry)!);
});

export const getProjects = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[image]", true);
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "title:asc");

  const payload = await strapiFetch<StrapiEnvelope<RawProject[]>>("/api/projects", query);

  return normalizeCollection<RawProject>(payload).map((entry) => mapProject(entry)!);
});

export const getTestimonials = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "author:asc");

  const payload = await strapiFetch<StrapiEnvelope<Testimonial[]>>(
    "/api/testimonials",
    query,
  );

  return normalizeCollection<Testimonial>(payload);
});

export async function getProductBySlug(locale: Locale, slug: string) {
  const query = baseQuery(locale);
  setPopulate(query, "populate[gallery][populate][0]", "image");
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[category][populate][0]", "image");
  query.set("filters[slug][$eq]", slug);
  query.append("sort[0]", "sortOrder:asc");

  const payload = await strapiFetch<StrapiEnvelope<RawProduct[]>>("/api/products", query);
  const [product] = normalizeCollection<RawProduct>(payload);

  return mapProduct(product);
}

export function getBaseSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000/${defaultLocale}`;
}
