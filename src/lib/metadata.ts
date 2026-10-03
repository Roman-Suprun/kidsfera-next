import type { Metadata } from "next";

import { isPreviewDeployment } from "@/lib/strapi";

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
  canonicalPath?: string;
  imageUrl?: string | null;
  openGraphType?: "article" | "website";
};

export function buildMetadata(
  seo: Seo | null | undefined,
  fallback: MetadataFallback,
): Metadata {
  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const canonicalPath = seo?.canonicalPath || fallback.canonicalPath;
  const canonical =
    canonicalPath && fallback.baseUrl
      ? new URL(canonicalPath, fallback.baseUrl).toString()
      : undefined;
  const imageUrl = seo?.ogImageUrl || fallback.imageUrl || undefined;
  const noIndex = Boolean(seo?.noIndex) || isPreviewDeployment();

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: fallback.openGraphType ?? "website",
      siteName: "Kidsfera",
      images: imageUrl ? [{ url: imageUrl, alt: ogTitle }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
