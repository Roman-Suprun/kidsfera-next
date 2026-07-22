import { cache } from "react";

import { defaultLocale, locales, type Locale } from "@/lib/i18n";

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

export type AboutValue = {
  title: string;
  description: string;
  icon: string;
  theme: "orange" | "blue" | "yellow" | "green";
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: MediaImage | null;
};

export type TimelineMilestone = {
  year: string;
  text: string;
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

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type SocialLink = {
  label: string;
  href: string;
  platform:
    | "facebook"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "telegram"
    | "whatsapp"
    | "tiktok"
    | "x"
    | "custom";
};

export type FooterLinkItem = {
  label: string;
  href?: string | null;
};

export type FooterLinkGroup = {
  title: string;
  items: FooterLinkItem[];
};

export type SiteSettings = {
  siteName: string;
  siteTagline?: string | null;
  defaultSeo?: Seo | null;
  languageSwitcherLocales: readonly Locale[];
  navCategoriesLabel: string;
  navCatalogLabel: string;
  navProjectsLabel: string;
  navProcessLabel: string;
  navAboutLabel: string;
  navBlogLabel: string;
  navContactLabel: string;
  navCtaLabel: string;
  footerDescription?: string | null;
  footerCopyright?: string | null;
  businessHoursLabel?: string | null;
  businessHoursPrimary?: string | null;
  businessHoursSecondary?: string | null;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: SocialLink[];
  footerLinkGroups: FooterLinkGroup[];
  footerBadges: Badge[];
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
  allLabel: string;
  noResultsLabel: string;
  viewDetailsLabel: string;
  itemsLabel: string;
  filtersLabel: string;
};

export type ProjectsPage = {
  seo?: Seo | null;
  eyebrow: string;
  title: string;
  subtitle: string;
  filterAllLabel: string;
  viewProjectLabel: string;
};

export type AboutPage = {
  seo?: Seo | null;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: MediaImage | null;
  heroStats: StatItem[];
  storyEyebrow: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  milestones: TimelineMilestone[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: AboutValue[];
  factoryEyebrow: string;
  factoryTitle: string;
  factoryDescription: string;
  factoryImage: MediaImage | null;
  factoryLocationLabel: string;
  factoryAddress: string;
  factoryStats: StatItem[];
  showTeamSection: boolean;
  teamEyebrow: string;
  teamTitle: string;
  teamMembers: TeamMember[];
  showCertificationsSection: boolean;
  certificationsEyebrow: string;
  certificationsTitle: string;
  certifications: Badge[];
  safetyCalloutIcon: string;
  safetyCalloutTitle: string;
  safetyCalloutDescription: string;
  safetyBadges: Badge[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type TermsMethod = {
  icon: string;
  title: string;
  description: string;
  badge?: string | null;
  accentColor?: string | null;
};

export type DeliveryPaymentPage = {
  seo?: Seo | null;
  heroEyebrow: string;
  title: string;
  subtitle: string;
  alertTitle: string;
  alertSubtitle: string;
  deliveryTitle: string;
  paymentTitle: string;
  deliveryMethods: TermsMethod[];
  paymentMethods: TermsMethod[];
  schemeTitle: string;
  schemeStep1Value: string;
  schemeStep1Title: string;
  schemeStep1Description: string;
  schemeStep2Value: string;
  schemeStep2Title: string;
  schemeStep2Description: string;
  schemeBadge: string;
  deliveryDetailTitle: string;
  localTabLabel: string;
  internationalTabLabel: string;
  localDeliveryIntro: string;
  localDeliveryLocations: string;
  deliveryNote: string;
  deliveryPickupNotes: Badge[];
  internationalDeliveryIntro: string;
  internationalCountries: Badge[];
  paymentRequirementsTitle: string;
  paymentRequirementsText: string;
  cashTitle: string;
  cashText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type LegalPage = {
  seo?: Seo | null;
  heroEyebrow: string;
  title: string;
  subtitle: string;
  content: string;
};

export type BlogSection = {
  heading: string;
  text: string;
};

export type BlogPage = {
  seo?: Seo | null;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  readMoreLabel: string;
  readTimeLabel: string;
  minutesShortLabel: string;
  allCategoriesLabel: string;
  backToBlogLabel: string;
  relatedArticlesTitle: string;
  authorLabel: string;
  emptyStateText: string;
};

export type BlogCategory = {
  id?: number;
  documentId?: string;
  name: string;
  slug: string;
  color: string;
  sortOrder?: number | null;
};

export type BlogPost = {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: MediaImage | null;
  authorName: string;
  authorRole: string;
  publishDate: string;
  readTimeMinutes: number;
  bodySections: BlogSection[];
  category: BlogCategory | null;
  seo?: Seo | null;
  sortOrder?: number | null;
  featured?: boolean | null;
};

export type ProductPageLabels = {
  galleryLabel?: string | null;
  specsLabel: string;
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
  categories: Category[];
  category?: Category | null;
};

export type FeedbackTargetType = "product" | "project";

export type Feedback = {
  id?: number;
  documentId?: string;
  name: string;
  content: string;
  rating: number;
  createdAt?: string | null;
  publishedAt?: string | null;
};

export type FeedbackSummary = {
  averageRating: number | null;
  totalCount: number;
};

export type Project = {
  id?: number;
  documentId?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  location: string;
  clientName: string;
  area: string;
  yearLabel: string;
  themeColor?: string | null;
  countryFlag?: string | null;
  imageUrl: string;
  gallery: ImageLink[];
  testimonial?: ProjectTestimonial | null;
  usedProducts: Product[];
  categories: Category[];
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

type RawProjectsPage = Omit<ProjectsPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawBlogPage = Omit<BlogPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawBlogCategory = BlogCategory;

type RawBlogPost = Omit<BlogPost, "seo" | "coverImage" | "category"> & {
  seo?: RawSeo | null;
  coverImage?: StrapiMedia | null;
  category?: RawBlogCategory | RawBlogCategory[] | null;
};

type RawTeamMember = Omit<TeamMember, "avatar"> & {
  image?: StrapiMedia | null;
};

type RawAboutPage = Omit<AboutPage, "seo" | "heroImage" | "factoryImage" | "teamMembers"> & {
  seo?: RawSeo | null;
  heroImage?: StrapiMedia | null;
  factoryImage?: StrapiMedia | null;
  teamMembers?: RawTeamMember[];
};

type RawDeliveryPaymentPage = Omit<DeliveryPaymentPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawLegalPage = Omit<LegalPage, "seo"> & {
  seo?: RawSeo | null;
};

type RawSiteSettings = Omit<SiteSettings, "defaultSeo" | "languageSwitcherLocales"> & {
  defaultSeo?: RawSeo | null;
  showEnglish?: boolean | null;
  showUkrainian?: boolean | null;
  showRussian?: boolean | null;
  showPolish?: boolean | null;
};

type RawCategory = Omit<Category, "imageUrl" | "seo"> & {
  image?: StrapiMedia | null;
  seo?: RawSeo | null;
};

type RawImageLink = Omit<ImageLink, "url"> & {
  image?: StrapiMedia | null;
};

type RawProduct = Omit<Product, "gallery" | "seo" | "category" | "categories"> & {
  gallery?: RawImageLink[];
  seo?: RawSeo | null;
  category?: RawCategory | RawCategory[] | null;
};

type RawProject = Omit<Project, "imageUrl" | "gallery" | "usedProducts" | "projectType" | "categories"> & {
  image?: StrapiMedia | null;
  gallery?: RawImageLink[];
  usedProducts?: RawProduct[];
  projectType?: RawCategory | RawCategory[] | null;
};

type RawFeedback = Feedback;

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
const REVALIDATE_SECONDS = 60;
const singleTypeFallbacks: Record<string, string[]> = {
  "/api/site-setting": ["/api/site-settings"],
  "/api/home-page": ["/api/home-pages"],
  "/api/about-page": ["/api/about-pages"],
  "/api/blog-page": ["/api/blog-pages"],
  "/api/delivery-payment-page": ["/api/delivery-payment-pages"],
  "/api/privacy-policy-page": ["/api/privacy-policy-pages"],
  "/api/gdpr-page": ["/api/gdpr-pages"],
  "/api/categories-page": ["/api/categories-pages"],
  "/api/catalog-page": ["/api/catalog-pages"],
  "/api/projects-page": ["/api/projects-pages"],
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

type StrapiFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

async function strapiFetch<T>(
  path: string,
  query?: URLSearchParams,
  options?: StrapiFetchOptions,
): Promise<T> {
  const requestPaths = [path, ...(singleTypeFallbacks[path] ?? [])];
  let lastError: Error | null = null;

  for (const requestPath of requestPaths) {
    let response: Response;

    try {
      response = await fetch(buildUrl(requestPath, query), {
        ...(options?.cache ? { cache: options.cache } : {}),
        ...(!options?.cache
          ? { next: { revalidate: options?.revalidate ?? REVALIDATE_SECONDS } }
          : {}),
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

function mapCategoryCollection(value: unknown): Category[] {
  if (Array.isArray(value)) {
    return value.map((entry) => mapCategory(entry)).filter((entry): entry is Category => Boolean(entry));
  }

  const singleCategory = mapCategory(value);

  return singleCategory ? [singleCategory] : [];
}

function mapProduct(value: unknown): Product | null {
  const product = value as RawProduct | null;

  if (!product) {
    return null;
  }

  const categories = mapCategoryCollection(product.category);

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
    categories,
    category: categories[0] ?? null,
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

function mapMediaImage(value: unknown, fallbackAlt = ""): MediaImage | null {
  const url = resolveMediaUrl(value);

  if (!url) {
    return null;
  }

  return {
    url,
    alt: resolveMediaAlt(value) ?? fallbackAlt,
  };
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

  return {
    ...item,
    image: mapMediaImage(item.image, item.imageAlt ?? ""),
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

  const categories = mapCategoryCollection(project.projectType);

  return {
    ...project,
    categories,
    projectType: categories.map((category) => category.name).join(", "),
    imageUrl: resolveMediaUrl(project.image) ?? "",
    gallery: (project.gallery ?? [])
      .map((entry) => mapImageLink(entry))
      .filter((entry): entry is ImageLink => Boolean(entry)),
    usedProducts: (project.usedProducts ?? [])
      .map((entry) => mapProduct(entry))
      .filter((entry): entry is Product => Boolean(entry)),
  };
}

function mapFeedback(value: unknown): Feedback | null {
  const feedback = value as RawFeedback | null;

  if (!feedback) {
    return null;
  }

  return {
    ...feedback,
    rating:
      typeof feedback.rating === "number" && Number.isFinite(feedback.rating)
        ? Math.min(5, Math.max(1, Math.round(feedback.rating)))
        : 5,
  };
}

function summarizeFeedback(feedbacks: Feedback[]): FeedbackSummary {
  if (!feedbacks.length) {
    return {
      averageRating: null,
      totalCount: 0,
    };
  }

  const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);

  return {
    averageRating: Math.round((totalRating / feedbacks.length) * 10) / 10,
    totalCount: feedbacks.length,
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

function mapProjectsPage(value: unknown): ProjectsPage | null {
  const page = value as RawProjectsPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
  };
}

function mapBlogPage(value: unknown): BlogPage | null {
  const page = value as RawBlogPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
  };
}

function mapBlogCategory(value: unknown): BlogCategory | null {
  const category = value as RawBlogCategory | null;

  if (!category) {
    return null;
  }

  return {
    ...category,
    color: category.color || "#FF4500",
  };
}

function mapBlogPost(value: unknown): BlogPost | null {
  const post = value as RawBlogPost | null;

  if (!post) {
    return null;
  }

  return {
    ...post,
    authorName: typeof post.authorName === "string" ? post.authorName.trim() : "",
    authorRole: typeof post.authorRole === "string" ? post.authorRole.trim() : "",
    seo: mapSeo(post.seo),
    coverImage: mapMediaImage(post.coverImage, post.title),
    bodySections: Array.isArray(post.bodySections) ? post.bodySections : [],
    category: Array.isArray(post.category)
      ? mapBlogCategory(post.category[0])
      : mapBlogCategory(post.category),
  };
}

function mapTeamMember(value: unknown): TeamMember | null {
  const member = value as RawTeamMember | null;

  if (!member) {
    return null;
  }

  return {
    ...member,
    avatar: mapMediaImage(member.image, member.name),
  };
}

function mapAboutPage(value: unknown): AboutPage | null {
  const page = value as RawAboutPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
    heroImage: mapMediaImage(page.heroImage, page.heroEyebrow),
    heroStats: Array.isArray(page.heroStats) ? page.heroStats : [],
    milestones: Array.isArray(page.milestones) ? page.milestones : [],
    values: Array.isArray(page.values) ? page.values : [],
    factoryImage: mapMediaImage(page.factoryImage, page.factoryTitle),
    factoryStats: Array.isArray(page.factoryStats) ? page.factoryStats : [],
    showTeamSection: typeof page.showTeamSection === "boolean" ? page.showTeamSection : true,
    teamMembers: Array.isArray(page.teamMembers)
      ? page.teamMembers
          .map((entry) => mapTeamMember(entry))
          .filter((entry): entry is TeamMember => Boolean(entry))
      : [],
    showCertificationsSection:
      typeof page.showCertificationsSection === "boolean" ? page.showCertificationsSection : true,
    certifications: Array.isArray(page.certifications) ? page.certifications : [],
    safetyBadges: Array.isArray(page.safetyBadges) ? page.safetyBadges : [],
  };
}

function mapDeliveryPaymentPage(value: unknown): DeliveryPaymentPage | null {
  const page = value as RawDeliveryPaymentPage | null;

  if (!page) {
    return null;
  }

  return {
    ...page,
    seo: mapSeo(page.seo),
    deliveryMethods: Array.isArray(page.deliveryMethods) ? page.deliveryMethods : [],
    paymentMethods: Array.isArray(page.paymentMethods) ? page.paymentMethods : [],
    deliveryPickupNotes: Array.isArray(page.deliveryPickupNotes) ? page.deliveryPickupNotes : [],
    internationalCountries: Array.isArray(page.internationalCountries)
      ? page.internationalCountries
      : [],
  };
}

function mapLegalPage(value: unknown): LegalPage | null {
  const page = value as RawLegalPage | null;

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

  const {
    defaultSeo,
    showEnglish,
    showUkrainian,
    showRussian,
    showPolish,
    ...rest
  } = settings;

  const localeToggles: Array<[Locale, boolean | null | undefined]> = [
    ["en", showEnglish],
    ["uk", showUkrainian],
    ["ru", showRussian],
    ["pl", showPolish],
  ];
  const hasExplicitLocaleSelection = localeToggles.some(([, enabled]) => typeof enabled === "boolean");
  const selectedLocales = hasExplicitLocaleSelection
    ? localeToggles
        .filter(([, enabled]) => enabled !== false)
        .map(([locale]) => locale)
    : locales;
  const languageSwitcherLocales = selectedLocales.length ? selectedLocales : [defaultLocale];

  return {
    ...rest,
    defaultSeo: mapSeo(defaultSeo),
    languageSwitcherLocales,
    socialLinks: Array.isArray(rest.socialLinks) ? rest.socialLinks : [],
    footerLinkGroups: Array.isArray(rest.footerLinkGroups) ? rest.footerLinkGroups : [],
    footerBadges: Array.isArray(rest.footerBadges) ? rest.footerBadges : [],
  };
}

export const getSiteSettings = cache(async (locale: Locale) => {
  const buildSiteSettingsQuery = (targetLocale: Locale) => {
    const query = baseQuery(targetLocale);
    setPopulate(query, "populate[defaultSeo][populate][0]", "ogImage");
    setPopulate(query, "populate[socialLinks]", true);
    setPopulate(query, "populate[footerLinkGroups][populate][items]", true);
    setPopulate(query, "populate[footerBadges]", true);
    return query;
  };

  const [localizedPayload, sharedPayload] = await Promise.all([
    strapiFetch<StrapiEnvelope<RawSiteSettings | null>>(
      "/api/site-setting",
      buildSiteSettingsQuery(locale),
      { cache: "no-store" },
    ),
    locale === defaultLocale
      ? Promise.resolve(null)
      : strapiFetch<StrapiEnvelope<RawSiteSettings | null>>(
          "/api/site-setting",
          buildSiteSettingsQuery(defaultLocale),
          { cache: "no-store" },
        ),
  ]);

  const localizedSettings = mapSiteSettings(normalizeSingle<RawSiteSettings>(localizedPayload));

  if (!localizedSettings) {
    return null;
  }

  const sharedSettings =
    sharedPayload === null
      ? localizedSettings
      : mapSiteSettings(normalizeSingle<RawSiteSettings>(sharedPayload));

  return {
    ...localizedSettings,
    languageSwitcherLocales: sharedSettings?.languageSwitcherLocales ?? localizedSettings.languageSwitcherLocales,
  };
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
  setPopulate(query, "populate[contactForm][populate][0]", false);
  setPopulate(query, "populate[featuredProducts][populate][0]", "image");
  setPopulate(query, "populate[featuredProducts][populate][1]", "linkedCategory");

  const payload = await strapiFetch<StrapiEnvelope<RawHomePage | null>>(
    "/api/home-page",
    query,
  );

  return mapHomePage(normalizeSingle<RawHomePage>(payload));
});

export const getAboutPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[heroImage]", true);
  setPopulate(query, "populate[heroStats][populate][0]", false);
  setPopulate(query, "populate[milestones][populate][0]", false);
  setPopulate(query, "populate[values][populate][0]", false);
  setPopulate(query, "populate[factoryImage]", true);
  setPopulate(query, "populate[factoryStats][populate][0]", false);
  setPopulate(query, "populate[teamMembers][populate][0]", "image");
  setPopulate(query, "populate[certifications][populate][0]", false);
  setPopulate(query, "populate[safetyBadges][populate][0]", false);

  const payload = await strapiFetch<StrapiEnvelope<RawAboutPage | null>>(
    "/api/about-page",
    query,
  );

  return mapAboutPage(normalizeSingle<RawAboutPage>(payload));
});

export const getBlogPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawBlogPage | null>>(
    "/api/blog-page",
    query,
  );

  return mapBlogPage(normalizeSingle<RawBlogPage>(payload));
});

export const getDeliveryPaymentPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[deliveryMethods][populate][0]", false);
  setPopulate(query, "populate[paymentMethods][populate][0]", false);
  setPopulate(query, "populate[deliveryPickupNotes][populate][0]", false);
  setPopulate(query, "populate[internationalCountries][populate][0]", false);

  const payload = await strapiFetch<StrapiEnvelope<RawDeliveryPaymentPage | null>>(
    "/api/delivery-payment-page",
    query,
  );

  return mapDeliveryPaymentPage(normalizeSingle<RawDeliveryPaymentPage>(payload));
});

export const getPrivacyPolicyPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawLegalPage | null>>(
    "/api/privacy-policy-page",
    query,
  );

  return mapLegalPage(normalizeSingle<RawLegalPage>(payload));
});

export const getGdprPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawLegalPage | null>>(
    "/api/gdpr-page",
    query,
  );

  return mapLegalPage(normalizeSingle<RawLegalPage>(payload));
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

export const getProjectsPage = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");

  const payload = await strapiFetch<StrapiEnvelope<RawProjectsPage | null>>(
    "/api/projects-page",
    query,
  );

  return mapProjectsPage(normalizeSingle<RawProjectsPage>(payload));
});

export const getProductPageLabels = cache(async (locale: Locale) => {
  const query = baseQuery(locale);

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

export const getBlogCategories = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "name:asc");

  const payload = await strapiFetch<StrapiEnvelope<RawBlogCategory[]>>(
    "/api/blog-categories",
    query,
  );

  return normalizeCollection<RawBlogCategory>(payload)
    .map((entry) => mapBlogCategory(entry))
    .filter((entry): entry is BlogCategory => Boolean(entry));
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

export const getBlogPosts = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[coverImage]", true);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[category]", true);
  setPopulate(query, "populate[bodySections][populate][0]", false);
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "publishDate:desc");

  const payload = await strapiFetch<StrapiEnvelope<RawBlogPost[]>>("/api/blog-posts", query);

  return normalizeCollection<RawBlogPost>(payload)
    .map((entry) => mapBlogPost(entry))
    .filter((entry): entry is BlogPost => Boolean(entry));
});

export const getProjects = cache(async (locale: Locale) => {
  const query = baseQuery(locale);
  setPopulate(query, "populate[image]", true);
  setPopulate(query, "populate[projectType][populate][0]", "image");
  setPopulate(query, "populate[gallery][populate][0]", "image");
  setPopulate(query, "populate[testimonial][populate][0]", false);
  setPopulate(query, "populate[usedProducts][populate][gallery][populate][0]", "image");
  query.append("sort[0]", "sortOrder:asc");
  query.append("sort[1]", "title:asc");

  const payload = await strapiFetch<StrapiEnvelope<RawProject[]>>("/api/projects", query);

  return normalizeCollection<RawProject>(payload).map((entry) => mapProject(entry)!);
});

export async function getProjectBySlug(locale: Locale, slug: string) {
  const projects = await getProjects(locale);

  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  const query = baseQuery(locale);
  setPopulate(query, "populate[coverImage]", true);
  setPopulate(query, "populate[seo][populate][0]", "ogImage");
  setPopulate(query, "populate[category]", true);
  setPopulate(query, "populate[bodySections][populate][0]", false);
  query.set("filters[slug][$eq]", slug);

  const payload = await strapiFetch<StrapiEnvelope<RawBlogPost[]>>("/api/blog-posts", query);
  const [post] = normalizeCollection<RawBlogPost>(payload);

  return mapBlogPost(post);
}

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

const getFeedbackByTarget = cache(async (targetType: FeedbackTargetType, documentId: string) => {
  const query = new URLSearchParams();
  query.set("status", "published");
  query.set(`filters[${targetType}][documentId][$eq]`, documentId);
  query.set("filters[publishedAt][$notNull]", "true");
  query.append("sort[0]", "publishedAt:desc");
  query.append("sort[1]", "createdAt:desc");

  const payload = await strapiFetch<StrapiEnvelope<RawFeedback[]>>("/api/feedbacks", query, {
    cache: "no-store",
  });

  return normalizeCollection<RawFeedback>(payload)
    .map((entry) => mapFeedback(entry))
    .filter((entry): entry is Feedback => Boolean(entry));
});

export async function getProductFeedback(documentId: string | undefined) {
  if (!documentId) {
    return {
      feedbacks: [] as Feedback[],
      summary: summarizeFeedback([]),
    };
  }

  const feedbacks = await getFeedbackByTarget("product", documentId);

  return {
    feedbacks,
    summary: summarizeFeedback(feedbacks),
  };
}

export async function getProjectFeedback(documentId: string | undefined) {
  if (!documentId) {
    return {
      feedbacks: [] as Feedback[],
      summary: summarizeFeedback([]),
    };
  }

  const feedbacks = await getFeedbackByTarget("project", documentId);

  return {
    feedbacks,
    summary: summarizeFeedback(feedbacks),
  };
}

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
