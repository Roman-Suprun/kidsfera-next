import type { Metadata } from "next";

type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  canonicalPath?: string | null;
  ogImageUrl?: string | null;
  noIndex?: boolean | null;
};

type MetadataFallback = {
  title: string;
  description: string;
  baseUrl?: string;
};

export function buildMetadata(
  seo: Seo | null | undefined,
  fallback: MetadataFallback,
): Metadata {
  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const canonical =
    seo?.canonicalPath && fallback.baseUrl
      ? new URL(seo.canonicalPath, fallback.baseUrl).toString()
      : undefined;

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: seo?.ogImageUrl ? [{ url: seo.ogImageUrl }] : undefined,
    },
  };
}
